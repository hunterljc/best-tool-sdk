import { ipcRenderer } from "electron";
import { apiEvent } from "../../../main/config/constants";
import { IscpClient } from "../ipc_types/scp.type";

const scpClient: IscpClient = {
  init: (src: Object) => ipcRenderer.invoke(apiEvent.scp, "init", src),
  close: (src) => ipcRenderer.invoke(apiEvent.scp, "close", src),
  exists: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "exists", src),
  list: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "list", src),
  uploadFile: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "uploadFile", src),
  uploadDir: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "uploadDir", src),
  mkdir: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "mkdir", src),
  downloadFile: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "downloadFile", src),
  downloadDir: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "downloadDir", src),
  unlink: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "unlink", src),
  rmdir: (src: Array<string>) => ipcRenderer.invoke(apiEvent.scp, "rmdir", src),
};

export default scpClient;
