import { ipcMain, IpcMainInvokeEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";

const listenerEvent = () => {
  ipcMain.handle(apiEvent.fs, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    return new Promise((resolve, _reject) => {
      WorkerService.getInstance().workerEventEmitter.once(workerEvent.fsOn, ({ type, data }) => {
        if (type === "worker" + method) {
          resolve(data);
        }
      });
      WorkerService.getInstance().send(workerEvent.fs, {
        method,
        args
      });
    });
  });

  ipcMain.on(apiEvent.fsOn, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    WorkerService.getInstance().send(workerEvent.fs, {
      method,
      args
    });
  });
};

export const registerFsListenerEvent = () => {
  listenerEvent();
};
