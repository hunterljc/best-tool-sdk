import { ipcRenderer, IpcRendererEvent } from "electron";
import { MqttIpc } from "../ipc_types/mqtt.type";
import { mqttConstant } from "../../../main/config/constants";
import { IMqttMsg, IpcRenderCallback } from "../../../types/common";

const mqttIpc: MqttIpc = {
  connect: (host: string, port: number, winUrl: string) =>
    ipcRenderer.send(mqttConstant.connect, host, port, winUrl),
  subscribe: (topic: string) => ipcRenderer.send(mqttConstant.subscribe, topic),
  unsubscribe: (topic: string) => ipcRenderer.send(mqttConstant.unsubscribe, topic),
  onmessage: (callback: IpcRenderCallback) =>
    ipcRenderer.on(mqttConstant.onmessage, (_event: IpcRendererEvent, data: IMqttMsg) => {
      callback(_event, data);
    }),
  end: (): void => ipcRenderer.send(mqttConstant.end),
  // 移除监听
  removeOnMessage: (): void => {
    ipcRenderer.removeAllListeners(mqttConstant.onmessage);
  }
};

export default mqttIpc;
