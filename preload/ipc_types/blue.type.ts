import { IMsg, IpcRenderCallback } from "../../../types/common";

// 设备发现
export interface IBlueIpc {
  scanPortlist: () => Promise<any>;
  closePort: () => any;
  connectNewBlue: (path: string) => Promise<IMsg>;
  entryAT: () => void;
  outAT: () => void;
  portwrite: () => void;
  portRead: () => void;
  reStart: () => void;
  setRole: () => void;
  queryRole: () => void;
  manualconnectMacBll: (val: string) => void;
  connectMacBll: (val: string) => void;
  writeBin: (val: any) => void;
  writePake: (val: any) => void;
  onMessage: (winUrl: string, callback: IpcRenderCallback) => void;
  removeOnMessage: () => void;
}
