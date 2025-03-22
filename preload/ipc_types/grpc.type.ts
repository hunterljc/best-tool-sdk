import { IpcRenderCallback } from "./common";

// grpc传程
export interface IgrpcIpc {
  init: (
    protoName: string,
    ip: string,
    port: string,
    packageName: string,
    serviceName: string
  ) => void;
  request: (protoName: string, ip: string, name: string, params: object) => Promise<unknown>;
  startMartin: (serviceListPub: any, serviceList: any, martainList: any) => void;
  retransmit: () => void;
  reboot: (protoName: string, ip: string) => void;
  readJson: (ip: string, key: string) => void;
  close: (protoName: string, ip: string) => void;
  cancel: () => void;
  onMessage: (winUrl: string, callback: IpcRenderCallback) => void;
  removeOnMessage: () => void;
}
