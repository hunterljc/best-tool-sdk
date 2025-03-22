import { ipcMain, IpcMainInvokeEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";

const listenerEvent = () => {
  ipcMain.handle(apiEvent.orm, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    return new Promise((resolve, _reject) => {
      WorkerService.getInstance().workerEventEmitter.once(workerEvent.ormOn, ({ type, data }) => {
        if (type === "worker" + method) {
          resolve(JSON.parse(data));
        }
      });
      WorkerService.getInstance().send(workerEvent.orm, {
        method,
        args
      });
    });
  });
};

export const registerOrmListenerEvent = () => {
  listenerEvent();
};
