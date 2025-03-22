import { IpcRenderCallback } from "./common";

// 设备发现
export interface INatsClient {
  init: (src: Object) => Promise<boolean>;
  subscribe: (src: Array<string>) => Promise<unknown>;
  publish: (src: Array<string>) => Promise<unknown>;
  closed: () => Promise<boolean>;
  drain: () => Promise<boolean>;
  onMessage: (winUrl: string, callback: IpcRenderCallback) => void;
}
