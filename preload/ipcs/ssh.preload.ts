import { ipcRenderer, IpcRendererEvent } from "electron";
import { SSHIpc } from "../ipc_types/sshipc.type";
import { sshConstant } from "../../../main/config/constants";
import { IpcRenderCallback } from "../../../types/common";

const sshIpc: SSHIpc = {
  connectShell: (host: string, port: number, username: string, password: string, winUrl: string) =>
    ipcRenderer.send(sshConstant.connect, host, port, username, password, winUrl),
  onSshStream: (callback: IpcRenderCallback) =>
    ipcRenderer.on(sshConstant.onStream, (_event: IpcRendererEvent, data) => {
      callback(_event, data);
    }),
  sendWrite: (chunk: any): void => ipcRenderer.send(sshConstant.sendWrite, chunk),
  destroy: (host: string): void => ipcRenderer.send(sshConstant.destory, host),
  // 移除监听
  removeOnMessage: (): void => {
    ipcRenderer.removeAllListeners(sshConstant.onStream);
  }
};

export default sshIpc;
