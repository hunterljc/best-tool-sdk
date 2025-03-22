import { IIP4, IpcRenderCallback } from "../../../types/common";

// 设备发现
export interface ICoapIpc {
  coapPost: (i: string, host: string, ips: IIP4[]) => void;
  onMessage: (winUrl: string, callback: IpcRenderCallback) => void;
  removeOnMessage: () => void;
}
