import { BrowserWindow } from "electron";
import WindowPool from "./window.pool";
import { windowConfig } from "../../config/window.config";
import WindowManager from "../window.manager";
import { WindowOptions, type WindowParam } from "../windowParam.type";

class WindowPoolItem {
  public win: BrowserWindow;
  public param?: WindowParam;

  constructor() {
    const config = new WindowOptions();
    this.win = new BrowserWindow(config);
    this.initEvent();
    // this.win.hide();
    this.loadUrl(this.win, "/blank");
  }

  private initEvent() {
    this.win.on("close", () => {
      const _poolItems = WindowPool.getInstance().getDicts();
      const _index = _poolItems.findIndex((v) => v.param?.url === this.param?.url);
      if (_index > -1) {
        WindowPool.getInstance().deletePoolItem(_index);
      }
    });
    this.win.on("maximize", () => {
      this.win.maximize();
      // this.win.webContents.send(windowConstant.max);
    });
    this.win.on("unmaximize", () => {
      // this.win.webContents.send(windowConstant.unmax);
    });
  }

  private getLoadUrl(url: string) {
    // if (process.env.ENV_NOW === "dev") {
    //   return `http://localhost:${process.env.WEB_PORT}/#${url}`;
    // } else if (process.env.ENV_NOW === "test") {
    //   return `apptest://./index.html/#${url}`;
    // } else {
    //   return `app://./index.html/#${url}`;
    // }
    return url;
  }

  loadUrl(win: BrowserWindow, url: string) {
    const _url = this.getLoadUrl(url);
    win.webContents.loadURL(_url);
  }

  public use(param: WindowParam) {
    this.effectParam(param);
    this.loadUrl(this.win, param.url);
    WindowManager.getInstance().saveWindow(param.url, this.win);
  }

  effectParam(param: WindowParam) {
    this.param = param;
    this.win.setSize(
      this.param?.width ?? windowConfig.minWidth,
      this.param?.height ?? windowConfig.minHeight
    );
    this.win.setAlwaysOnTop(this.param?.alwaysOnTop || false);
    if (this.param.x !== undefined && this.param.y !== undefined) {
      this.win.setPosition(this.param.x, this.param.y);
    } else {
      this.win.center();
    }
    this.controlSize();
    this.win.moveTop();
    this.win.show();
  }

  private controlSize() {
    if (this.param?.resizable === false) {
      this.win.setResizable(false);
      return;
    } else if (this.param?.minHeight !== undefined && this.param.minWidth !== undefined) {
      this.win.setMinimumSize(this.param.minWidth, this.param.minHeight);
      this.win.setResizable(true);
      return;
    } else {
      this.win.setResizable(true);
      this.win.setMinimumSize(windowConfig.minWidth, windowConfig.minHeight);
    }
  }
}

export default WindowPoolItem;
