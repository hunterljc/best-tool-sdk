import { ipcRenderer, IpcRendererEvent } from "electron";
import { ISerialportIpc } from "../ipc_types/serialport.type";
import { apiEvent } from "../../../main/config/constants";
import { IpcRenderCallback } from "../ipc_types/common";
import { IMsg } from "../../../types/common";

const serialportIpc: ISerialportIpc = {
  // 扫描端口
  scanPortlist: (): Promise<any> => ipcRenderer.invoke(apiEvent.serialportHandle, "scanPortlist"),
  // 关闭端口
  closePort: (): void => ipcRenderer.send(apiEvent.serialportOn, "closePort"),
  // 连接端口
  connectNewBlue: (path: string, botr: number): Promise<IMsg> =>
    ipcRenderer.invoke(apiEvent.serialportHandle, "connectNewBlue", path, botr),
  // 开启监听
  portRead: (): void => ipcRenderer.send(apiEvent.serialportOn, "portRead"),
  writeBin: (val: any): void => ipcRenderer.send(apiEvent.serialportOn, "writeBin", val),
  writePake: (val: any): void => ipcRenderer.send(apiEvent.serialportOn, "writePake", val),
  // 接收主进程发来的数据
  onMessage: (winUrl: string, callback: IpcRenderCallback): void => {
    ipcRenderer.send(apiEvent.serialportOn, "onMessage", winUrl);
    ipcRenderer.on(apiEvent.serialportRec, (_event: IpcRendererEvent, data: unknown) =>
      callback(data)
    );
  },
  // 移除监听
  removeOnMessage: (): void => {
    ipcRenderer.removeAllListeners(apiEvent.serialportRec);
  }
};

export default serialportIpc;
