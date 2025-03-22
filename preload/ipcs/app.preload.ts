import { ipcRenderer, webFrame } from "electron";
import { ISystemInfo, AppIpc } from "../ipc_types/app.type";
import { apiEvent } from "../../../main/config/constants";
import { IIP4, NamePathType } from "../../../types/common";

const appIpc: AppIpc = {
  // 系统通知
  notification: (title: string, body: string): void => {
    ipcRenderer.send(apiEvent.systemOn, "notification", title, body);
  },

  // 获取程序相关目录
  getPath: (name: NamePathType): Promise<string> =>
    ipcRenderer.invoke(apiEvent.system, "getPath", name),

  // 文件路径
  openFile: (path: string): Promise<boolean> =>
    ipcRenderer.invoke(apiEvent.system, "openFile", path),

  // 返回选择文件路径
  openFileInFolder: (path: string): Promise<boolean> =>
    ipcRenderer.invoke(apiEvent.system, "openFileInFolder", path),

  // 选择导入文件路径
  showSaveDialogSync: (winUrl: string): Promise<string> =>
    ipcRenderer.invoke(apiEvent.system, "showSaveDialogSync", winUrl),

  // 选择保存文件
  showOpenDialogSync: (winUrl: string): Promise<string> =>
    ipcRenderer.invoke(apiEvent.system, "showOpenDialogSync", winUrl),

  // 获取插件目录
  getpluginDir: (): Promise<string> => ipcRenderer.invoke(apiEvent.system, "getpluginDir"),

  // 查询APP版本
  getVersion: (): Promise<string> => ipcRenderer.invoke(apiEvent.system, "getVersion"),

  // 窗口内容缩放
  setZoomFactor: (ratio: number): void => webFrame.setZoomFactor(ratio),

  // 获取本机ip
  getLocalIpAddress: (): Promise<string> =>
    ipcRenderer.invoke(apiEvent.system, "getLocalIpAddress"),

  // 获取所有ip
  getAllIpAddress: (): Promise<IIP4[]> => ipcRenderer.invoke(apiEvent.system, "getAllIpAddress"),

  // 判断网络状态
  isOnLine: (): Promise<boolean> => ipcRenderer.invoke(apiEvent.system, "isOnLine"),
  getSystemInfo: async (): Promise<ISystemInfo> =>
    ipcRenderer.invoke(apiEvent.system, "getSystemInfo"),

  //获取初始化盘符
  initLocal: (): Promise<any> => ipcRenderer.invoke(apiEvent.system, "initLocal"),

  //获取文件类型
  setDirtoType: (pathVal: string): Promise<any> =>
    ipcRenderer.invoke(apiEvent.system, "setDirtoType", pathVal)
};

export default appIpc;
