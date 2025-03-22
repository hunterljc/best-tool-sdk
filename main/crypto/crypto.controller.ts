import { ipcMain, IpcMainInvokeEvent, IpcMainEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";

const listenerEvent = () => {
  ipcMain.handle(apiEvent.crypto, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    return new Promise((resolve, _reject) => {
      WorkerService.getInstance().workerEventEmitter.once(
        workerEvent.cryptoOn,
        ({ type, data }) => {
          if (type === "worker" + method) {
            resolve(data);
          }
        }
      );
      WorkerService.getInstance().send(workerEvent.crypto, {
        method,
        args
      });
    });
  });

  ipcMain.on(apiEvent.cryptoOn, (_event: IpcMainEvent, method: string, ...args: any[]) => {
    WorkerService.getInstance().send(workerEvent.crypto, {
      method,
      args
    });
  });
};

export const registerCryptoListenerEvent = () => {
  listenerEvent();
};
