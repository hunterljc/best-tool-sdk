import { IpcMainEvent, ipcMain, IpcMainInvokeEvent } from "electron";
import { apiEvent } from "../config/constants";
import WindowManager from "../window/window.manager";
import blue from "../utils/blue";

const blueWorkEvent = () => {
  let wind;
  ipcMain.on(apiEvent.blueOn, (_event: IpcMainEvent, method: string, ...args: any[]): void => {
    if (method === "onMessage") {
      wind = WindowManager.getInstance().getWindow(args[0]);
    } else if (method === "portRead") {
      blue.portRead((data: unknown) => {
        wind?.webContents.send(apiEvent.blueRec, data);
      });
    } else {
      blue[method](...args);
    }
  });

  ipcMain.handle(
    apiEvent.blueHandle,
    async (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
      const res = await blue[method](...args);
      return res;
    }
  );
};

export default blueWorkEvent;
