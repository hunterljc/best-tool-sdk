import { ipcRenderer } from "electron";
import { IProcessIpc } from "../ipc_types/process.type";
import { apiEvent } from "../../../main/config/constants";

const processIpc: IProcessIpc = {
  // 关闭端口
  openDir: (url: string): void => ipcRenderer.send(apiEvent.processOn, "openDir", url),
  startAPP: (programPath: string): void =>
    ipcRenderer.send(apiEvent.processOn, "startAPP", programPath),
  closeAPP: (): void => ipcRenderer.send(apiEvent.processOn, "closeAPP")
};

export default processIpc;
