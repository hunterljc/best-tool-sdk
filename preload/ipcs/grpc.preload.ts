import { ipcRenderer, IpcRendererEvent } from "electron";
import { IgrpcIpc } from "../ipc_types/grpc.type";
import { apiEvent } from "../../../main/config/constants";
import { IpcRenderCallback } from "../ipc_types/common";

const grpcIpc: IgrpcIpc = {
  init: (
    protoName: string,
    ip: string,
    port: string,
    packageName: string,
    serviceName: string
  ): void =>
    ipcRenderer.send(apiEvent.grpcOn, "init", protoName, ip, port, packageName, serviceName),
  request: (protoName: string, ip: string, name: string, params: object): Promise<unknown> =>
    ipcRenderer.invoke(apiEvent.grpc, "request", protoName, ip, name, params),
  startMartin: (serviceListPub: any, serviceList: any, martainList: any): void =>
    ipcRenderer.send(apiEvent.grpcOn, "startMartin", serviceListPub, serviceList, martainList),
  retransmit: (): void => ipcRenderer.send(apiEvent.grpcOn, "retransmit"),
  readJson: (ip: string, key: string): void =>
    ipcRenderer.send(apiEvent.grpcOn, "readJson", ip, key),
  cancel: (): void => ipcRenderer.send(apiEvent.grpcOn, "cancel"),
  reboot: (protoName: string, ip: string): void =>
    ipcRenderer.send(apiEvent.grpcOn, "reboot", protoName, ip),
  close: (protoName: string, ip: string): void =>
    ipcRenderer.send(apiEvent.grpcOn, "close", protoName, ip),
  onMessage: (winUrl: string, callback: IpcRenderCallback): void => {
    ipcRenderer.send(apiEvent.grpcOn, "onMessage", winUrl);
    ipcRenderer.on(apiEvent.grpcRec, (_event: IpcRendererEvent, data: unknown) => callback(data));
  },
  removeOnMessage: (): void => {
    ipcRenderer.send(apiEvent.grpcOn, "removeOnMessage");
    ipcRenderer.removeAllListeners(apiEvent.grpcRec);
  }
};
export default grpcIpc;
