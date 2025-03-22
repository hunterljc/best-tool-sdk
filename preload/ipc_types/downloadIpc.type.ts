import { IDownloadFile, INewFileForm } from "../../../types/download";
import { IpcRenderCallback } from "./common";

// 下载
export interface DownloadIpc {
  getDownloadList: (type?: number) => Promise<IDownloadFile[]>;
  startDownload: (data: INewFileForm) => Promise<IDownloadFile | null>;
  retryDownload: (data: IDownloadFile) => void;
  listenNew: (callback: IpcRenderCallback) => void;
  listenUpdate: (callback: IpcRenderCallback) => void;
  listenDone: (callback: IpcRenderCallback) => void;
  removeAllListeners: () => void;
  removeDownloadItem: (item: IDownloadFile) => Promise<void>;
  pauseOrResume: (item: IDownloadFile) => Promise<IDownloadFile>;
  clearDownloadDone: () => void;
  getByPluginId: (pluginId: string) => Promise<void>;
}
