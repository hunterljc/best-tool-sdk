import { ipcMain, IpcMainInvokeEvent } from "electron";
import { apiEvent } from "../config/constants";
import buffer from "../utils/buffer";

const bufferEvent = () => {
  ipcMain.handle(
    apiEvent.bufferOn,
    async (_event: IpcMainInvokeEvent, method: string, ...args: any[]) => {
      const res = await buffer[method](...args);
      return res;
    }
  );
};

export default bufferEvent;
