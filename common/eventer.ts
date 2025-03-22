import events from "events";
import { ipcRenderer, ipcMain, webContents } from "electron";

type Callback = (...args: any[]) => void | unknown;

class Eventer {
  private instance;

  constructor() {
    this.instance = new events.EventEmitter();
    this.initEventPipe();
  }

  emit(eventName: string, enentArgs): void {
    this.instance.emit(eventName, enentArgs);

    if (ipcMain) {
      webContents.getAllWebContents().forEach((wc) => {
        wc.send("_eventPipe", { eventName, enentArgs });
      });
    }

    if (ipcRenderer) {
      ipcRenderer.invoke("_eventPipe", { eventName, enentArgs });
    }
  }

  on(eventName: string, callback: Callback): void {
    this.instance.on(eventName, callback);
  }

  initEventPipe(): void {
    if (ipcRenderer) {
      ipcRenderer.on("_eventPipe", (_e, { eventName, enentArgs }) => {
        this.instance.emit(eventName, enentArgs);
      });
    }

    if (ipcMain) {
      ipcMain.handle("_eventPipe", (e, { eventName, enentArgs }) => {
        this.instance.emit(eventName, enentArgs);

        webContents.getAllWebContents().forEach((wc) => {
          if (wc.id != e.sender.id) {
            wc.send("_eventPipe", { eventName, enentArgs });
          }
        });
      });
    }
  }
}

export const eventer = new Eventer();
