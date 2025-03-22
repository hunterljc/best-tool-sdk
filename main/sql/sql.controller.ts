import { ipcMain, IpcMainInvokeEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";

const listenerEvent = () => {
  ipcMain.handle(apiEvent.sql, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    return new Promise((resolve, _reject) => {
      WorkerService.getInstance().workerEventEmitter.once(workerEvent.sqlOn, ({ type, data }) => {
        if (type === "worker" + method) {
          resolve(data);
        }
      });
      WorkerService.getInstance().send(workerEvent.sql, {
        method,
        args
      });
    });
  });
};

export const registerSqlListenerEvent = () => {
  listenerEvent();
};
