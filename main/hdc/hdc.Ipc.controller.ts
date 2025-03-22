/* eslint-disable no-unused-vars */
import { IpcMainInvokeEvent, ipcMain } from "electron";
import { apiEvent } from "../config/constants.js";
import { workerEvent } from "../config/worker.config.js";
import WorkerService from "../worker/worker.service.js";

const listenerEvent = () => {
  ipcMain.handle(apiEvent.hdc, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    return new Promise((resolve, _reject) => {
      WorkerService.getInstance().workerEventEmitter.once(workerEvent.hdcOn, ({ type, data }) => {
        if (type === "worker" + method) {
          resolve(data);
        }
      });
      WorkerService.getInstance().send(workerEvent.hdc, {
        method,
        args
      });
    });
  });
};

export const registerHDCListenerEvent = () => {
  listenerEvent();
};
