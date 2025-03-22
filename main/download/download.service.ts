import { type BrowserWindow } from "electron";
import { IDownloadFile, INewFileForm } from "../../types/download";
import fs from "fs-extra";
import https from "https";
import path, { join } from "path";
import WindowManager from "../window/window.manager";
import { apiEvent } from "../config/constants";
import { getFileIcon, getFileName, isExistFile, uuidV4 } from "../utils/utils";
import DownloadHelper from "./download.helper";
import _ from "lodash";
import WorkerService from "../worker/worker.service";
import { workerEvent } from "../config/worker.config";
import { MAIN_WINDOW_PATH } from "../config/path.config";

class DwonloadService {
  private static instance: DwonloadService;

  public static getInstance(): DwonloadService {
    if (!DwonloadService.instance) {
      DwonloadService.instance = new DwonloadService();
      DwonloadService.instance.initWindow();
    }
    return DwonloadService.instance;
  }

  private win: BrowserWindow | undefined;

  private downloadList: IDownloadFile[] = [];

  initWindow() {
    const _ret = WindowManager.getInstance().getWindow(MAIN_WINDOW_PATH);
    if (_ret) {
      this.win = _ret;
    }
  }

  /**
   * 开始下载
   * @param method
   * @param data
   * @returns
   */
  async startDownload(method: string, data: INewFileForm): Promise<IDownloadFile | null> {
    const { url, path: savePath, fileName, winUrl } = data;
    const _ret = WindowManager.getInstance().getWindow(winUrl);
    if (_ret) {
      this.win = _ret;
    }
    const _fileName = getFileName(fileName ?? "", url);
    const _filePath = path.join(savePath, _fileName);
    const existItem = DownloadHelper.isExistItem(url);
    const existFile = isExistFile(_filePath);

    const _icon = await getFileIcon(savePath);
    const _newItem: IDownloadFile = {
      markId: uuidV4(),
      icon: _icon,
      url,
      fileName: _fileName,
      filePath: _filePath,
      status: "pause",
      speed: 0,
      progress: 0,
      totalBytes: 0,
      receivedBytes: 0,
      type: 0
    };

    if (existFile) {
      const _markId = existItem?.markId || uuidV4();
      if (existItem) {
        return { ...existItem, markId: _markId, filePath: _filePath } as IDownloadFile;
      }
      return _newItem;
    }

    if (existItem) {
      this.retryDownloadFile(method, {
        ...existItem,
        url,
        filePath: _filePath,
        fileName: _fileName
      });
      return null;
    }

    this.downloadFile(_newItem);
    return null;
  }

  retryDownloadFile(_method: string, item: IDownloadFile) {
    this.downloadFile(item);
  }

  downloadFile(item: IDownloadFile) {
    let _startBytes = 0;
    let _receivedBytes = 0;

    if (fs.existsSync(item.filePath)) {
      const ret = fs.statSync(item.filePath).size;
      _receivedBytes = ret;
      _startBytes = ret;
    }

    const options: https.RequestOptions = { headers: {} };

    if (_receivedBytes > 0) {
      if (options.headers !== undefined) {
        options.headers["Range"] = `bytes=${_receivedBytes}-`;
      }
    }

    const _downloadItem = this.addDownloadItem(item);
    // DownloadHelper.setTaskbar([...this.downloadList], this.win, -1);
    this.win?.webContents.send(apiEvent.listenNew, {
      ..._downloadItem,
      requestClient: null
    });

    const requestInstance = https.get(_downloadItem.url, options, (response) => {
      const contentLength = parseInt(response.headers["content-length"] ?? "0");
      const totalBytes = contentLength + _receivedBytes;
      _downloadItem.totalBytes = totalBytes;

      const fileStream = fs.createWriteStream(_downloadItem.filePath, {
        flags: "a",
        start: _startBytes
      });

      const startTime = Date.now();

      if (response.statusCode === 200 || response.statusCode === 206) {
        response.on("data", (chunk) => {
          fileStream.write(chunk);
          _receivedBytes += chunk.length;

          if (_downloadItem.status !== "running") {
            _downloadItem.status = "running";

            WorkerService.getInstance().send(workerEvent.download, {
              method: "updateOne",
              args: [["running"], ["status"], "markId", _downloadItem.markId]
            });
          }

          const _speed = DownloadHelper.calculateSpeed(startTime, _receivedBytes, _startBytes);
          if (_speed) {
            _downloadItem.speed = _speed;
          }

          _downloadItem.receivedBytes = _receivedBytes;

          _downloadItem.status = "running";
          _downloadItem.progress = _downloadItem.receivedBytes / _downloadItem.totalBytes;

          const bytes = DownloadHelper.getDownloadBytes(this.downloadList);
          this.win?.setProgressBar(bytes.receivedBytes / bytes.totalBytes);
          this.win?.webContents.send(apiEvent.listenUpdate, {
            ..._downloadItem,
            requestClient: null
          });
        });
        response.on("end", () => {
          fileStream.end();
          console.log("Download completed");

          _downloadItem.status = "completed";

          DownloadHelper.downloadComplete(_downloadItem, this.downloadList, this.win);
        });
        response.on("error", () => {
          this.handlerError(_downloadItem, fileStream);
        });
      } else if (response.statusCode === 416) {
        console.log("Download already completed");
      } else {
        console.log(`Download failed with status code: ${response.statusCode}`);
        this.handlerError(_downloadItem, fileStream);
      }
    });

    requestInstance.on("error", (error) => {
      console.log("Download failed:", error.message);
      this.handlerError(item);
    });

    _downloadItem.requestClient = requestInstance;
  }

  private handlerError(item: IDownloadFile, ws?: fs.WriteStream) {
    this.closeRequest(item);
    if (ws) {
      !ws.destroyed && ws.destroy();
    }
    if (item.requestClient) {
      !item.requestClient.destroyed && item.requestClient.destroy();
    }
  }

  private closeRequest(item: IDownloadFile) {
    if (!item.requestClient) return;
    !item.requestClient.destroyed && item.requestClient?.destroy();
  }

  async getDownloadList(method: string, type = 0): Promise<IDownloadFile[]> {
    return new Promise((resolve, _reject) => {
      WorkerService.getInstance().workerEventEmitter.once(
        workerEvent.downloadOn,
        ({ type, data }) => {
          if (type === "worker" + method) {
            this.downloadList = data.map((v) => DownloadHelper.db2Bean(v));
            resolve(this.downloadList);
          }
        }
      );
      WorkerService.getInstance().send(workerEvent.download, {
        method,
        args: [type]
      });
    });
  }

  closeDownloadWindow() {
    this.downloadList.forEach((item) => {
      if (item.status === "running") {
        item.requestClient && !item.requestClient.destroyed && item.requestClient.destroy();
        item.requestClient = undefined;
        item.status = "pause";
      }
    });
    this.win?.setProgressBar(0, { mode: "none" });

    const _data = [...this.downloadList].map((item) => ({
      ...item,
      requestClient: undefined
    }));
    WorkerService.getInstance().send(workerEvent.download, {
      method: "updateByList",
      args: [_data]
    });
    this.downloadList = [];
  }

  addDownloadItem(item: IDownloadFile): IDownloadFile {
    const _index = this.downloadList.findIndex((el) => el.markId === item.markId);
    if (_index > -1) {
      const oldItem = this.downloadList.splice(_index, 1)[0];
      oldItem.requestClient && !oldItem.requestClient.destroyed && oldItem.requestClient.destroy();
    }
    this.downloadList.unshift(item);
    WorkerService.getInstance().send(workerEvent.download, {
      method: "insertDownloadItem",
      args: [
        {
          ...item,
          requestClient: undefined
        }
      ]
    });
    return item;
  }

  /**
   * 删除下载条目
   * @param method = "removeDownloadItem"
   * @param item
   */
  removeDownloadItem(_method: string, item: IDownloadFile) {
    const _index = this.downloadList.findIndex((el) => el.markId === item.markId);
    if (_index > -1) {
      const _requestClient = this.downloadList[_index].requestClient;
      if (item.status === "running") {
        _requestClient && !_requestClient.destroyed && _requestClient.destroy();
      }
    }
    this.downloadList.splice(_index, 1);
    WorkerService.getInstance().send(workerEvent.download, {
      method: "deleteOne",
      args: [item.markId, "markId"]
    });
  }

  /**
   *
   * @param method="pauseOrResume"
   * @param item
   * @returns
   */
  pauseOrResume(_method: string, item: IDownloadFile) {
    const _index = this.downloadList.findIndex((el) => el.markId === item.markId);
    const _sourceItem = this.downloadList[_index];
    if (!_sourceItem.requestClient) {
      this.downloadFile(item);
      return { ...item, requestClient: null };
    }
    if (_sourceItem.status !== "running") {
      _sourceItem.status = "running";
      this.downloadFile(item);
    } else {
      !_sourceItem.requestClient.destroyed && _sourceItem.requestClient.destroy();
      _sourceItem.status = "pause";
    }

    return { ..._sourceItem, requestClient: null };
  }

  /**
   *
   * @param method ="getDownloadByPluginId"
   * @param pluginId
   */
  getDownloadByPluginId(_method: string, pluginId: string) {
    WorkerService.getInstance().send(workerEvent.download, {
      method: "findOne",
      args: [pluginId]
    });
  }

  /**
   *
   * @param method ="clearDownloadDone"
   */
  clearDownloadDone(_method: string) {
    this.downloadList = this.downloadList.filter((el) => el.status === "running");
    WorkerService.getInstance().send(workerEvent.download, {
      method: "deleteDone",
      args: []
    });
  }
}

export default DwonloadService;
