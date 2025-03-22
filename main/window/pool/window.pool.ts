/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { ipcMain } from "electron";
import WindowPoolItem from "./window.pool.item";
import type { WindowParam } from "../windowParam.type";

const POOL_SIZE = 2;
class WindowPool {
  private static instance: WindowPool;

  public static getInstance(): WindowPool {
    if (!WindowPool.instance) {
      WindowPool.instance = new WindowPool();
    }
    return WindowPool.instance;
  }

  private dict: WindowPoolItem[] = [];

  public getDicts() {
    return this.dict;
  }

  public clearPool() {
    this.dict.forEach((el) => {
      if (!el.win.isDestroyed() && el.win.isClosable()) {
        el.win.close();
      }
    });
    this.dict = [];
  }

  public init() {
    for (let i = 0; i < POOL_SIZE; i++) {
      this.dict.push(new WindowPoolItem());
    }
    // ipcMain.handle(windowConstant.openPool, (_event, data) => {
    //   this.consumerBlankWindow(data);
    // });
  }

  public consumerBlankWindow(param: WindowParam) {
    if (this.isWindowInUse(param)) {
      return;
    }
    this.findAndUseBlank(param);
  }

  public deletePoolItem(index: number) {
    this.dict.splice(index, 1);
  }

  private isWindowInUse(param: WindowParam) {
    const _item = this.dict.find((v) => v.param?.url === param.url);
    if (!_item) return false;
    _item.effectParam(param);
    return true;
  }

  private findAndUseBlank(param: WindowParam) {
    const _item = this.dict.find((v) => !v.param);
    _item!.use(param);
    this.dict.push(new WindowPoolItem());
  }
}

export default WindowPool;
