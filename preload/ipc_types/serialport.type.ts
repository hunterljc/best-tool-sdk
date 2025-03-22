import { IMsg, IpcRenderCallback } from "../../../types/common";

// 设备发现
export interface ISerialportIpc {
  scanPortlist: () => Promise<any>;
  closePort: () => any;
  connectNewBlue: (path: string, botr: number) => Promise<IMsg>;
  portRead: () => void;
  writeBin: (val: any) => void;
  writePake: (val: any) => void;
  onMessage: (winUrl: string, callback: IpcRenderCallback) => void;
  removeOnMessage: () => void;
}
