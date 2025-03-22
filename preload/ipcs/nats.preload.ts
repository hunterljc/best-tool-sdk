import { ipcRenderer, IpcRendererEvent } from "electron";
import { INatsClient } from "../ipc_types/nats.type";
import { apiEvent } from "../../../main/config/constants";
import { IpcRenderCallback } from "../ipc_types/common";

const natsClient: INatsClient = {
  init: (src: Object) => ipcRenderer.invoke(apiEvent.nats, "init", src),
  // subscribe: (src:Array<string>) => ipcRenderer.invoke(apiEvent.nats, "subscribe", src),
  // 接收主进程发来的数据
  subscribe: (src: Array<string>) => ipcRenderer.invoke(apiEvent.nats, "subscribe", src),
  // 接收主进程发来的数据
  onMessage: (winUrl: string, callback: IpcRenderCallback): void => {
    ipcRenderer.send(apiEvent.nats, "onMessage", winUrl);
    ipcRenderer.on(apiEvent.natsRec, (_event: IpcRendererEvent, data: unknown) => callback(data));
  },
  publish: (src: Array<string>) => ipcRenderer.invoke(apiEvent.nats, "publish", src),
  closed: (): Promise<boolean> => {
    const res = ipcRenderer.invoke(apiEvent.nats, "closed");
    ipcRenderer.removeAllListeners(apiEvent.natsRec);
    return res;
  },
  drain: (): Promise<boolean> => {
    ipcRenderer.removeAllListeners(apiEvent.natsRec);
    const res = ipcRenderer.invoke(apiEvent.nats, "drain");
    return res;
  }
};

export default natsClient;
