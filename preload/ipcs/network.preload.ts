import { ipcRenderer, IpcRendererEvent } from "electron";
import { IpcRenderCallback } from "../ipc_types/common";
import { InetWorkIpc } from "../ipc_types/network.type";
import { INet } from "../../../types/common";
import { apiEvent } from "../../../main/config/constants";

const netWorkIpc: InetWorkIpc = {
  // 开启socket
  startListing: (net: INet, model: string): void =>
    ipcRenderer.send(apiEvent.netOn, "listing", model, net),
  // 发送数据
  transmit: (net: INet, model: string, data: unknown): void =>
    ipcRenderer.send(apiEvent.netOn, "transmit", model, net, data),
  // 关闭socket
  closeServer: (model: string): void => ipcRenderer.send(apiEvent.netOn, "closeServer", model),
  // 接收主进程发来的数据
  onMessage: (model: string, winUrl: string, callback: IpcRenderCallback): void => {
    ipcRenderer.send(apiEvent.netOn, "onMessage", model, winUrl);
    ipcRenderer.on(apiEvent.netRec, (_event: IpcRendererEvent, data: unknown) => callback(data));
  },
  // 移除监听
  removeOnMessage: (): void => {
    ipcRenderer.removeAllListeners(apiEvent.netRec);
  }
};

export default netWorkIpc;
