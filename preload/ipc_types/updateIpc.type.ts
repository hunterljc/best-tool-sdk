import { IpcRenderCallback } from "./common";

// updateipc
export interface UpdateIpc {
  submitUpdate: () => void;
  checkForUpdates: () => void;
  onUpdateAvailable: (callback: IpcRenderCallback) => void;
  onProgress: (callback: IpcRenderCallback) => void;
  removeAllListeners: () => void;
}
