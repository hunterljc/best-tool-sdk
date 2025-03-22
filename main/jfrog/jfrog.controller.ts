import { ipcMain, IpcMainInvokeEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";

const listenerEvent = () => {
  ipcMain.handle(
    apiEvent.jfrog,
    (_event: IpcMainInvokeEvent, method: string, src: Array<string>) => {
      return new Promise((resolve, _reject) => {
        WorkerService.getInstance().workerEventEmitter.once(
          workerEvent.jfrogOn,
          ({ type, data }) => {
            if (type === "worker" + method) {
              resolve(data);
            }
          }
        );
        WorkerService.getInstance().send(workerEvent.jfrog, {
          method,
          src
        });
      });
    }
  );
};

export const registerJfrogListenerEvent = () => {
  listenerEvent();
};
