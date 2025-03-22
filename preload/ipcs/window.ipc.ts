import { ipcRenderer } from "electron";
import { WindowIpc } from "../ipc_types/windowIpc.type";
import { apiEvent } from "../../../main/config/constants";
import { WindowParam } from "../../../main/window/windowParam.type";
import { eventer } from "../../../common/eventer";

const windowIpc: WindowIpc = {
  // 打开普通窗口
  openNormalWindow: (option: WindowParam): void =>
    ipcRenderer.send(apiEvent.windowOn, "createWindow", option),
  // 打开窗口池窗口
  openPoolWindow: (option: WindowParam): void =>
    ipcRenderer.send(apiEvent.windowOn, "createPoolWindow", option),
  // 关闭单个窗口
  closeSingle: (path: string): void =>
    ipcRenderer.send(apiEvent.windowOn, "closeSingleWindow", path),
  // 关闭所有窗口
  closeAll: (): void => ipcRenderer.send(apiEvent.windowOn, "closeAllWindow"),
  // 最大化缩放
  max: (path: string): void => ipcRenderer.send(apiEvent.windowOn, "maximizeWindow", path),
  unmax: (path: string): void => ipcRenderer.send(apiEvent.windowOn, "minimizeWindow", path),
  sendMsg: (args: object): void => {
    eventer.emit("event-from-render", args);
  },
  onMSg: (callback: Function): void => {
    eventer.on("event-from-main", (args: object) => {
      callback(args);
    });
  }
};

export default windowIpc;
