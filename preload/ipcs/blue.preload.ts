import { ipcRenderer, IpcRendererEvent } from "electron";
import { IBlueIpc } from "../ipc_types/blue.type";
import { apiEvent } from "../../../main/config/constants";
import { IpcRenderCallback } from "../ipc_types/common";
import { IMsg } from "../../../types/common";

const blueIpc: IBlueIpc = {
  // 扫描端口
  scanPortlist: (): Promise<any> => ipcRenderer.invoke(apiEvent.blueHandle, "scanPortlist"),
  // 关闭端口
  closePort: (): void => ipcRenderer.send(apiEvent.blueOn, "closePort"),
  // 连接端口
  connectNewBlue: (path: string): Promise<IMsg> =>
    ipcRenderer.invoke(apiEvent.blueHandle, "connectNewBlue", path),
  // 扫描地址
  entryAT: (): void => ipcRenderer.send(apiEvent.blueOn, "entryAT"),
  // 扫描地址
  outAT: (): void => ipcRenderer.send(apiEvent.blueOn, "outAT"),
  // 重启模组
  reStart: (): void => ipcRenderer.send(apiEvent.blueOn, "reStart"),
  // 设置主角色
  setRole: (): void => ipcRenderer.send(apiEvent.blueOn, "setRole"),
  // 查询角色
  queryRole: (): void => ipcRenderer.send(apiEvent.blueOn, "queryRole"),
  // 扫描地址
  portwrite: (): void => ipcRenderer.send(apiEvent.blueOn, "portwrite"),
  // 开启监听
  portRead: (): void => ipcRenderer.send(apiEvent.blueOn, "portRead"),
  //
  manualconnectMacBll: (val: string): void =>
    ipcRenderer.send(apiEvent.blueOn, "manualconnectMacBll", val),
  connectMacBll: (val: string): void => ipcRenderer.send(apiEvent.blueOn, "connectMacBll", val),
  writeBin: (val: any): void => ipcRenderer.send(apiEvent.blueOn, "writeBin", val),
  writePake: (val: any): void => ipcRenderer.send(apiEvent.blueOn, "writePake", val),

  // 接收主进程发来的数据
  onMessage: (winUrl: string, callback: IpcRenderCallback): void => {
    ipcRenderer.send(apiEvent.blueOn, "onMessage", winUrl);
    ipcRenderer.on(apiEvent.blueRec, (_event: IpcRendererEvent, data: unknown) => callback(data));
  },
  // 移除监听
  removeOnMessage: (): void => {
    ipcRenderer.removeAllListeners(apiEvent.blueRec);
  }
};

export default blueIpc;
