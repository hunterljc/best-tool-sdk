import { ipcMain, IpcMainInvokeEvent, IpcMainEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";
import WindowManager from "../window/window.manager";

const listenerEvent = () => {
  let wind;
  ipcMain.handle(
    apiEvent.nats,
    (_event: IpcMainInvokeEvent, method: string, src: Array<string>) => {
      console.log("ipcMain.handle", method);
      return new Promise((resolve, _reject) => {
        WorkerService.getInstance().workerEventEmitter.once(
          workerEvent.natsOn,
          ({ type, data }) => {
            if (type === "worker" + method) {
              resolve(data);
            }
          }
        );
        WorkerService.getInstance().send(workerEvent.nats, {
          method,
          src
        });
      });
    }
  );
  ipcMain.on(apiEvent.nats, (_event: IpcMainEvent, method: string, winUrl: string): void => {
    if (method === "onMessage") {
      wind = WindowManager.getInstance().getWindow(winUrl);
    }
  });

  WorkerService.getInstance().workerEventEmitter.on(workerEvent.natsOn, ({ data }) => {
    wind?.webContents.send(apiEvent.natsRec, data);
  });
};

export const registerNatsListenerEvent = () => {
  listenerEvent();
};
