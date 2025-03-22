import { ipcRenderer } from "electron";
import { SftpIpc } from "../ipc_types/sftpipc.type";
import { sftpConstant } from "../../../main/config/constants";

const sftpIpc: SftpIpc = {
  init: (host: string, port: number, username: string, password: string) =>
    ipcRenderer.invoke(sftpConstant.init, host, port, username, password),
  activeNode: (name: string) => ipcRenderer.invoke(sftpConstant.activeNode, name),
  download: (downloadPath: string, pathName: string) =>
    ipcRenderer.invoke(sftpConstant.download, downloadPath, pathName),
  deleteFile: (remoteFilePath: string) =>
    ipcRenderer.invoke(sftpConstant.deleteFile, remoteFilePath),
  initLocal: () => ipcRenderer.invoke(sftpConstant.initLocal),
  setDirtoType: (pathName: string) => ipcRenderer.invoke(sftpConstant.setDirtoType, pathName),
  upload: (localPath: string, remotePath: string) =>
    ipcRenderer.invoke(sftpConstant.upload, localPath, remotePath)
};

export default sftpIpc;
