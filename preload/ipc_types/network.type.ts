import { INet } from "../../../types/common";
import { IpcRenderCallback } from "./common";

// 以太网
export interface InetWorkIpc {
  startListing: (net: INet, model: string) => void;
  transmit: (net: INet, model: string, data: unknown) => void;
  closeServer: (model: string) => void;
  onMessage: (model: string, winUrl: string, callback: IpcRenderCallback) => void;
  removeOnMessage: () => void;
}
