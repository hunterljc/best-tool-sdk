import { ipcRenderer, IpcRendererEvent } from "electron";
import { ICoapIpc } from "../ipc_types/coap.type";
import { Callback, IIP4, IcoapItem } from "../../../types/common";
import { apiEvent } from "../../../main/config/constants";

const coapIpc: ICoapIpc = {
  coapPost: (i: string, host: string, ips: IIP4[]): void => {
    ipcRenderer.send(apiEvent.coapOn, "coapPost", i, host, ips);
  },
  onMessage: (winUrl: string, callback: Callback): void => {
    ipcRenderer.send(apiEvent.coapOn, "onMessage", winUrl);
    ipcRenderer.on(apiEvent.coapRec, (_event: IpcRendererEvent, data: IcoapItem[]) => {
      callback(data);
    });
  },
  // 移除监听
  removeOnMessage: (): void => {
    ipcRenderer.removeAllListeners(apiEvent.coapRec);
  }
};

export default coapIpc;
