import { IpcRenderCallback } from "../../../types/common";

// 设备发现
export interface ICoap2Ipc {
  init: () => void;
  discover: (timeout: number) => void;
  onMessage: (winUrl: string, callback: IpcRenderCallback) => void;
  removeOnMessage: () => void;
}
