import { IpcMainEvent, ipcMain } from "electron";
import { apiEvent } from "../config/constants";
import simulator from "../utils/simulator";

const simulatorEvent = () => {
  ipcMain.on(apiEvent.simulatorOn, (_event: IpcMainEvent, method: string, ...args: any[]): void => {
    simulator[method](...args);
  });
};

export default simulatorEvent;
