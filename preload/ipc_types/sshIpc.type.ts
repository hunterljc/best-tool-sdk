import { IpcRenderCallback } from "../../../types/common";

export interface SSHIpc {
  connectShell: (
    host: string,
    port: number,
    username: string,
    password: string,
    winUrl: string
  ) => void;
  onSshStream: (callback: IpcRenderCallback) => void;
  sendWrite: (chunk: any) => void;
  destroy: (host: string) => void;
  removeOnMessage: () => void;
}
