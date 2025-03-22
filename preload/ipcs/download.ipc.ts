import { ipcRenderer } from "electron";
import { IDownloadFile, INewFileForm } from "../../../types/download";
import { DownloadIpc } from "../ipc_types/downloadIpc.type";
import { apiEvent } from "../../../main/config/constants";
import { IpcRenderCallback } from "../ipc_types/common";

const downloadIpc: DownloadIpc = {
  getDownloadList: (type?: number): Promise<IDownloadFile[]> =>
    ipcRenderer.invoke(apiEvent.download, "getDownloadList", type),

  startDownload: (data: INewFileForm): Promise<IDownloadFile | null> =>
    ipcRenderer.invoke(apiEvent.download, "startDownload", data),

  retryDownload: (data: IDownloadFile): void =>
    ipcRenderer.send(apiEvent.downloadOn, "retryDownloadFile", data),

  listenNew: (callback: IpcRenderCallback): void => {
    ipcRenderer.on(apiEvent.listenNew, callback);
  },
  listenUpdate: (callback: IpcRenderCallback): void => {
    ipcRenderer.on(apiEvent.listenUpdate, callback);
  },

  listenDone: (callback: IpcRenderCallback): void => {
    ipcRenderer.on(apiEvent.listenDone, callback);
  },

  removeAllListeners: (): void => {
    ipcRenderer.removeAllListeners(apiEvent.listenNew);
    ipcRenderer.removeAllListeners(apiEvent.listenUpdate);
    ipcRenderer.removeAllListeners(apiEvent.listenDone);
  },

  removeDownloadItem: (item: IDownloadFile): Promise<void> =>
    ipcRenderer.invoke(apiEvent.download, "removeDownloadItem", item),

  pauseOrResume: (item: IDownloadFile): Promise<IDownloadFile> =>
    ipcRenderer.invoke(apiEvent.download, "pauseOrResume", item),

  clearDownloadDone: (): void => ipcRenderer.send(apiEvent.downloadOn, "clearDownloadDone"),

  getByPluginId: (pluginId: string): Promise<void> =>
    ipcRenderer.invoke(apiEvent.download, "getDownloadByPluginId", pluginId)
};

export default downloadIpc;
