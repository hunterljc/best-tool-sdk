/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BrowserWindow, app } from "electron";
import WindowPool from "./pool/window.pool";
import type { WindowParam } from "./windowParam.type";
import { newWInOptions } from "../config/window.config";
import { join } from "path";
import merge from "lodash/merge";
import { MAIN_WINDOW_PATH } from "../config/path.config";

class WindowManager {
  private static instance: WindowManager;

  public static getInstance(): WindowManager {
    if (!WindowManager.instance) {
      WindowManager.instance = new WindowManager();
    }
    return WindowManager.instance;
  }

  private winds: Map<string, BrowserWindow> = new Map();

  /**
   * 创建普通窗口(插件主窗口除外) 外部传参合并默认配置
   * 主程序调用：join(__dirname, "../preload/index.js")
   * 主程序打开窗口调用--------preload路径处理：join(__dirname, "../preload/index.js")
   * 插件内打开窗口调用--------preload路径处理
   *
   */
  public createWindow(options: WindowParam): BrowserWindow {
    const op = merge({}, newWInOptions(), options);
    // console.log("mergerop=====op", op);
    const _wind = this.restoreWindow(options.url);
    if (_wind) return _wind;

    // 判断是插件内部打开的窗口还是主程序打开的窗口
    if (op.url.includes("hd-plugin-")) {
      op.webPreferences.preload = join(__dirname, "../preload/index.js");
    } else {
      op.webPreferences.preload = join(__dirname, "../preload/index.js");
    }

    const wind = new BrowserWindow(op);

    // 保存窗口，key为路由路径
    const key = options.url.split("?")[0];
    this.saveWindow(key, wind);

    const isMain = options.url === MAIN_WINDOW_PATH;

    if (!isMain) {
      if (options.loadType === "file") {
        wind.webContents.loadFile(options.url);
      } else if (options.loadType === "url") {
        wind.webContents.loadURL(options.url);
      }
      // 开发模式打开控制台
      if (process.env.NODE_ENV) {
        wind.webContents.openDevTools();
      }
    }
    wind.on("closed", () => {
      // 关闭主窗口
      if (isMain) {
        this.closeMainWindow();
      } else {
        this.winds.delete(options.url);
      }
    });

    return wind;
  }

  /**
   * 使用窗口池创建窗口
   */
  public createPoolWindow(options: WindowParam) {
    WindowPool.getInstance().consumerBlankWindow(options);
  }

  /**
   * 保存window
   */
  public saveWindow(path: string, wind: BrowserWindow): void {
    if (this.winds.has(path)) return;
    this.winds.set(path, wind);
  }

  /**
   * 获取字典长度
   */
  public getWindowLength(): number {
    return this.winds.size;
  }

  /**
   * 获取window实例
   */
  public getWindow(path: string): BrowserWindow | undefined {
    const _wind = this.winds.get(path);
    return _wind;
  }

  /**
   * 恢复指定窗口
   */
  public restoreWindow(path: string): BrowserWindow | undefined {
    const _wind = this.getWindow(path);
    if (_wind) {
      _wind.restore();
      _wind.show();
    }
    return _wind;
  }

  /**
   * 最大化
   */
  public maximizeWindow(path: string) {
    const _wind = this.getWindow(path);
    if (_wind) {
      _wind.isMaximized() ? _wind.unmaximize() : _wind.maximize();
    }
  }

  /**
   * 最小化
   */
  public minimizeWindow(path: string) {
    const _wind = this.getWindow(path);
    if (_wind) {
      _wind.isMinimized() ? _wind.restore() : _wind.minimize();
    }
  }

  /**
   * 登录
   */
  public logIn(path: string) {
    const _wind = this.getWindow(path);
    if (_wind) {
      _wind.setMinimumSize(1400, 800);
      _wind.maximize();
    }
  }

  /**
   * 退出登录
   */
  public logOut(path: string) {
    const _wind = this.getWindow(path);
    if (_wind) {
      _wind.restore();
      _wind.setMinimumSize(400, 460);
      _wind.setSize(400, 460);
    }
  }

  /**
   * 关闭单窗口
   */
  public closeSingleWindow(path: string) {
    const _wind = this.getWindow(path);
    if (_wind) {
      if (_wind.webContents.isDevToolsOpened()) {
        _wind.webContents.closeDevTools();
      }
      _wind.close();
      // 移除窗体
      this.winds.delete(path);
    }
  }

  public closeMainWindow() {
    this.closeAllWindow();
    this.winds.delete(MAIN_WINDOW_PATH);
    app.quit();
  }

  public closeAllWindow() {
    WindowPool.getInstance().clearPool();
    this.winds.forEach((el) => {
      if (!el.isDestroyed() && el.isClosable()) {
        el.close();
      }
    });
  }

  /**
   * 退出程序
   */
  public quiteApp() {
    this.closeAllWindow();
    this.winds.clear();
  }
}

export default WindowManager;
