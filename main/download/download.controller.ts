import { ipcMain, IpcMainInvokeEvent, IpcMainEvent } from "electron";
import { apiEvent } from "../config/constants";
import DwonloadService from "./download.service";

const listenerEvent = () => {
  ipcMain.handle(apiEvent.download, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) =>
    DwonloadService.getInstance()[method](method, ...args)
  );
  ipcMain.on(apiEvent.downloadOn, (_event: IpcMainEvent, method: string, ...args: any[]) => {
    DwonloadService.getInstance()[method](method, ...args);
  });
};

export const registerDownloadListenerEvent = () => {
  listenerEvent();
};
