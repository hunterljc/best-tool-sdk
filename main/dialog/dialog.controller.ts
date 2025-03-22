import { ipcMain, IpcMainInvokeEvent, IpcMainEvent } from "electron";
import { apiEvent } from "../config/constants";
import dialogService from "./dialog.service";

const listenerEvent = (): void => {
  ipcMain.handle(apiEvent.dialog, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) =>
    dialogService[method](...args)
  );
  ipcMain.on(apiEvent.dialogOn, (_event: IpcMainEvent, method: string, ...args: any[]) => {
    dialogService[method](...args);
  });
};

export const registerDialogListenerEvent = (): void => {
  listenerEvent();
};
