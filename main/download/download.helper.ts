import type { BrowserWindow } from "electron";
import { IDownloadFile, DbDownloadFile, IDownloadBytes } from "../../types/download";
import DownloadDbProvider from "../db/download.db";
import { apiEvent } from "../config/constants";

class DownloadHelper {
  static setTaskbar(data: IDownloadFile[], win: BrowserWindow | undefined, progress: number) {
    const _completed = data.filter((el) => el.status === "completed");
    const _count = (data.length = _completed.length);

    if (win) {
      win.setProgressBar(_count < 1 ? -1 : progress);
    }
  }

  static isExistItem(url: string): IDownloadFile | undefined {
    const ret = DownloadDbProvider.getInstance().findOne(url, "url");
    if (ret) {
      return this.db2Bean(ret);
    }
    return undefined;
  }

  static calculateSpeed(startTime: number, receivedBytes: number, startBytes): number | undefined {
    const currentTime = Date.now();
    const elaspedTime = (currentTime - startTime) / 1000;
    const _speed = (receivedBytes - startBytes) / elaspedTime;
    if (Number.isFinite(_speed)) {
      return _speed;
    }
    return undefined;
  }

  static addDbDownloadItem(data: IDownloadFile) {
    const instance = DownloadDbProvider.getInstance();
    const ret = instance.findOne(data.filePath, "filePath");
    if (ret) {
      instance.updateById(data, ret.id);
    } else {
      instance.insertOne(data);
    }
  }

  static downloadComplete(
    item: IDownloadFile,
    items: IDownloadFile[],
    wind: BrowserWindow | undefined
  ) {
    // DownloadHelper.setTaskbar(items, wind, 0);
    wind?.webContents.send(apiEvent.listenDone, {
      ...item,
      requestClient: null
    });

    const instance = DownloadDbProvider.getInstance();
    const ret = instance.findOne(item.filePath, "filePath");
    const { status, receivedBytes, totalBytes } = item;
    if (ret) {
      instance.updateOne(
        [status, receivedBytes, totalBytes],
        ["status", "receivedBytes", "totalBytes"],
        "markId",
        ret.markId
      );
    } else {
      instance.insertOne(item);
    }
  }

  static getDownloadBytes(data: IDownloadFile[]): IDownloadBytes {
    const allBytes = data.reduce<IDownloadBytes>(
      (prev, current) => {
        if (current.status === "running") {
          prev.receivedBytes += current.receivedBytes;
          prev.totalBytes += current.totalBytes;
        }
        return prev;
      },
      { receivedBytes: 0, totalBytes: 0 }
    );

    return allBytes;
  }

  static db2Bean(data: DbDownloadFile): IDownloadFile {
    const { markId, url, icon, fileName, filePath, status, totalBytes, receivedBytes, id, type } =
      data;
    const ret: IDownloadFile = {
      id,
      markId,
      url,
      icon,
      fileName,
      filePath,
      status,
      totalBytes,
      receivedBytes,
      speed: 0,
      progress: 0,
      type
    };
    return ret;
  }
}

export default DownloadHelper;
