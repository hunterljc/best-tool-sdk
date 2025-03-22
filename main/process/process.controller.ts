import { IpcMainEvent, ipcMain } from "electron";
import { apiEvent } from "../config/constants";
import processUtil from "../utils/process";

const processEvent = () => {
  ipcMain.on(apiEvent.processOn, (_event: IpcMainEvent, method: string, ...args: any[]): void => {
    processUtil[method](...args);
  });
};

export default processEvent;
