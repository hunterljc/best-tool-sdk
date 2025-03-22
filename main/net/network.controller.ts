import { ipcMain, IpcMainEvent } from "electron";
import { apiEvent } from "../config/constants";
import { workerEvent } from "../config/worker.config";
import WorkerService from "../worker/worker.service";
import WindowManager from "../window/window.manager";

// 以太网
const netWorkEvent = () => {
  let wind;
  ipcMain.on(
    apiEvent.netOn,
    (_event: IpcMainEvent, method: string, model: string, ...args: any[]): void => {
      if (method === "onMessage") {
        wind = WindowManager.getInstance().getWindow(args[0]);
      } else {
        WorkerService.getInstance().send(workerEvent.net, {
          method,
          model,
          args
        });
      }
    }
  );

  // 接收woker消息,发送给预加载层
  WorkerService.getInstance().workerEventEmitter.on(workerEvent.netOn, ({ data }) => {
    wind?.webContents.send(apiEvent.netRec, data);
  });
};

export default netWorkEvent;
