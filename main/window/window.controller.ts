import { ipcMain, IpcMainEvent } from "electron";
import { apiEvent } from "../config/constants";
import WindowManager from "./window.manager";
import { eventer } from "../../common/eventer";

const listenerEvent = (): void => {
  ipcMain.on(apiEvent.windowOn, (_event: IpcMainEvent, method: string, ...args: any[]) => {
    WindowManager.getInstance()[method](...args);
  });

  /**
   * 事件中心
   */
  eventer.on("event-from-render", (args) => {
    eventer.emit("event-from-main", args);
  });
};

export const registerWindowListenerEvent = (): void => {
  listenerEvent();
};
