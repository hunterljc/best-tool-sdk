import { ipcRenderer, IpcRendererEvent } from "electron";
import { ICoap2Ipc } from "../ipc_types/coap2.type";
import { Callback, ICoap2Item } from "../../../types/common";
import { apiEvent } from "../../../main/config/constants";

const coap2Ipc: ICoap2Ipc = {
  init: (): void => {
    ipcRenderer.send(apiEvent.coap2On, "init");
  },
  discover: (timeout: number): void => {
    ipcRenderer.send(apiEvent.coap2On, "discover", timeout);
  },
  onMessage: (winUrl: string, callback: Callback): void => {
    ipcRenderer.send(apiEvent.coap2On, "onMessage", winUrl);
    ipcRenderer.on(apiEvent.coap2Rec, (_event: IpcRendererEvent, data: ICoap2Item[]) => {
      callback(data);
    });
  },
  // 移除监听
  removeOnMessage: (): void => {
    ipcRenderer.removeAllListeners(apiEvent.coapRec);
  }
};

export default coap2Ipc;
