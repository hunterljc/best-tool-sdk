import { IpcRenderCallback } from "../../../types/common";

export interface MqttIpc {
  connect: (host: string, port: number, winUrl: string) => any;
  subscribe: (topic: string) => any;
  unsubscribe: (topic: string) => any;
  onmessage: (callback: IpcRenderCallback) => any;
  end: () => void;
  removeOnMessage: () => void;
}
