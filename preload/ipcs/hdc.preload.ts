import { ipcRenderer } from "electron";
import { IHdcIpc } from "../ipc_types/hdc.type";
import { apiEvent } from "../../../main/config/constants";

const hdcIpc: IHdcIpc = {
  discover: () => ipcRenderer.invoke(apiEvent.hdc, "discover"),
  searchDevice: () => ipcRenderer.invoke(apiEvent.hdc, "searchDevice"),
  rebootDevice: () => ipcRenderer.invoke(apiEvent.hdc, "rebootDevice"),
  shell: () => ipcRenderer.invoke(apiEvent.hdc, "shell"),
  topShell: (usbNumber: string) => ipcRenderer.invoke(apiEvent.hdc, "topShell", usbNumber),
  connect: (ip) => ipcRenderer.invoke(apiEvent.hdc, "connect", ip),
  installApp: (packageName) => ipcRenderer.invoke(apiEvent.hdc, "installApp", packageName),
  uninstallApp: (packageName) => ipcRenderer.invoke(apiEvent.hdc, "uninstallApp", packageName),
  updatedApp: (packageName) => ipcRenderer.invoke(apiEvent.hdc, "updatedApp", packageName),
  sendFile: (param) => ipcRenderer.invoke(apiEvent.hdc, "sendFile", param),
  reciveFile: (param) => ipcRenderer.invoke(apiEvent.hdc, "reciveFile", param),
  kill: () => ipcRenderer.invoke(apiEvent.hdc, "kill"),
  pingIP: (ip) => ipcRenderer.invoke(apiEvent.hdc, "pingIP", ip),
  fileTreeTopShell: () => ipcRenderer.invoke(apiEvent.hdc, "fileTreeTopShell"),
  fileTreeShell: () => ipcRenderer.invoke(apiEvent.hdc, "fileTreeShell"),
  update: (param) => ipcRenderer.invoke(apiEvent.hdc, "update", param),
  getInstalledPackage: (usbIpNumber) =>
    ipcRenderer.invoke(apiEvent.hdc, "getInstalledPackage", usbIpNumber),
  getSystemInfo: (usbIpNumber) => ipcRenderer.invoke(apiEvent.hdc, "getSystemInfo", usbIpNumber),
  getCoreLog: (key) => ipcRenderer.invoke(apiEvent.hdc, "getCoreLog", key),
  getInitLog: (key) => ipcRenderer.invoke(apiEvent.hdc, "getInitLog", key),
  getAppLog: (key) => ipcRenderer.invoke(apiEvent.hdc, "getAppLog", key),
  getKmsgLog: (key) => ipcRenderer.invoke(apiEvent.hdc, "getKmsgLog", key)
};

export default hdcIpc;
