import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";

const gitEvent = (): void => {
  let wind;

  ipcMain.handle(apiEvent.git, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    return new Promise((resolve, _reject) => {
      WorkerService.getInstance().workerEventEmitter.once(workerEvent.gitOn, ({ type, data }) => {
        if (type === "worker" + method) {
          resolve(data);
        }
      });
      WorkerService.getInstance().send(workerEvent.git, {
        method,
        args
      });
    });
  });

  ipcMain.on(apiEvent.git, (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
    WorkerService.getInstance().send(workerEvent.git, {
      method,
      args
    });
  });
};

export default gitEvent;
