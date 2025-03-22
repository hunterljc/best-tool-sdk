import { ipcMain, IpcMainInvokeEvent, IpcMainEvent } from "electron";
import { apiEvent } from "../config/constants";
import systemService from "./system.service";
import isOnLineObj from "../utils/isOnLine";

const listenerEvent = () => {
  ipcMain.handle(apiEvent.system, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) =>
    systemService[method](...args)
  );
  ipcMain.on(apiEvent.systemOn, (_event: IpcMainEvent, method: string, ...args: any[]) => {
    systemService[method](...args);
  });
};

export const registerSystemListenerEvent = () => {
  // 开启网络检测
  isOnLineObj.startTimer();
  // 开启信道监听
  listenerEvent();
};
