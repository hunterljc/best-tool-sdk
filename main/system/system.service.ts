import { app, shell, Notification, dialog } from "electron";
import { isExistFile } from "../utils/utils";
import { NamePathType, IIP4 } from "../../types/common";
import { PLUGIN_PATH } from "../config/path.config";
import isOnLineObj from "../utils/isOnLine";
import { getOpenPath, getSavePath } from "../utils/dialog";
import WindowManager from "../window/window.manager";
import sys, { type Systeminformation } from "systeminformation";
import os from "os";
import fs from "fs-extra";
import junk from "junk";
import path from "path";

interface ISystemInfo {
  cpuInfo: string;
  diskInfo: string;
  blockDevices: Systeminformation.BlockDevicesData[];
}

const systemService = {
  // 系统通知
  notification: (title: string, body: string): void => {
    new Notification({ title: title, body: body }).show();
  },

  // 获取程序相关目录
  getPath: (name: NamePathType): string => app.getPath(name),

  // 文件路径
  openFile: (path: string): boolean => {
    if (!isExistFile(path)) return false;
    shell.openPath(path);
    return true;
  },

  // 打开文件所在位置
  openFileInFolder: (path: string): boolean => {
    if (!isExistFile(path)) return false;
    shell.showItemInFolder(path);
    return true;
  },

  // 选择导入文件
  showOpenDialogSync: async (winUrl: string): Promise<string> => {
    const win = WindowManager.getInstance().getWindow(winUrl);
    if (win) {
      return await getOpenPath(win);
    } else {
      return "";
    }
  },
  // 选择保存文件
  showSaveDialogSync: async (winUrl: string): Promise<string> => {
    const win = WindowManager.getInstance().getWindow(winUrl);
    if (win) {
      return await getSavePath(win);
    } else {
      return "";
    }
  },

  // 获取插件目录
  getpluginDir: (): string => PLUGIN_PATH,

  // 查询APP版本
  getVersion: (): string => app.getVersion(),

  // 获取第0个ip
  getLocalIpAddress(): string {
    const all = os.networkInterfaces();
    const arr: IIP4[] = [];
    for (let key in all) {
      if (key.includes("以太网") || key.includes("Ethernet") || key.includes("WLAN")) {
        const ipv4Interfaces = all[key].filter((e) => e.family === "IPv4");
        arr.push(...ipv4Interfaces);
      }
    }
    if (arr.length) {
      return arr[0].address;
    } else {
      return "";
    }
  },
  // 发现所有ip
  getAllIpAddress(): IIP4[] {
    try {
      let all = os.networkInterfaces();
      const arr: IIP4[] = [];
      for (let key in all) {
        if (key.includes("以太网") || key.includes("Ethernet") || key.includes("WLAN")) {
          const children = all[key] as IIP4[];
          const ipv4Interfaces = children.filter((e) => e.family === "IPv4");
          ipv4Interfaces && arr.push(...ipv4Interfaces);
        }
      }
      return arr;
    } catch (error) {
      console.log("获取所有ip出错", String(error));
      return [];
    }
  },
  // 检测网络
  isOnLine(): boolean {
    return isOnLineObj.getState();
  },
  getSystemInfo: async (): Promise<ISystemInfo> => {
    try {
      const cpuInfo: string = (await sys.memLayout())[0].serialNum; // 获取CPU序列号
      const diskInfo: string = (await sys.diskLayout())[0].name; // 获取硬盘序列号
      const blockDevices: Systeminformation.BlockDevicesData[] = await sys.blockDevices();
      return {
        cpuInfo,
        diskInfo,
        blockDevices
      };
    } catch (error) {
      console.log("读取硬件信息", error);
      return {
        cpuInfo: "",
        diskInfo: "",
        blockDevices: []
      };
    }
  },

  async initLocal(): Promise<any[]> {
    //1、建立桌面
    return new Promise((resolve, _reject) => {
      const desktopPath = path.join(os.homedir(), "Desktop");
      const arr: any[] = [];
      const status = {
        name: "桌面",
        path: desktopPath,
        type: "~",
        children: []
      };
      arr.push(status);
      sys.blockDevices((des) => {
        // console.log("c盘", des);
        for (const item of des) {
          const obj: any = new Object();
          obj.name = item.label + "(" + item.name + ")";
          obj.path = path.join(item.identifier, "\\");
          obj.type = "~";
          obj.leaf = false;
          obj.children = [];
          arr.push(obj);
        }
        // console.log(arr);
        resolve(arr);
      });
    });
  },

  async setDirtoType(pathval: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(pathval, async (err, dirlist) => {
        if (err) {
          reject(err);
        }
        const list = dirlist.filter(junk.not);
        const arr = list.filter((item) => !/^\$/.test(item));
        if (arr.length == 0) {
          resolve([]);
        }
        const res = await this.promiseAll(pathval, arr);
        resolve(res);
      });
    });
  },

  // 处理循环中使用promise
  async promiseAll(pathval, list) {
    const arr: any = [];
    for (const item of list) {
      if (
        item !== "System Volume Information" &&
        item != "Config.Msi" &&
        item != "DumpStack.log.tmp" &&
        item != "hiberfil.sys" &&
        item != "pagefile.sys" &&
        item != "swapfile.sys" &&
        item != "Recovery"
      ) {
        arr.push(
          new Promise((resolve, reject) => {
            fs.stat(path.join(pathval, item), (err, file) => {
              if (err) {
                // console.log("xxx", err);
                reject(err);
              }
              const status: any = {
                type: "",
                path: "",
                name: "",
                size: 0,
                leaf: false,
                mtime: ""
              };
              if (file.isDirectory()) {
                status.type = "d";
                status.size = -1;
                status.leaf = false;
                status.children = [];
                status.mtime = file.mtimeMs;
              } else {
                status.type = "-";
                status.size = file.size;
                status.leaf = true;
                status.mtime = file.mtimeMs;
              }
              status.name = item;
              status.path = path.join(pathval, item);
              resolve(status);
            });
          })
        );
      }
    }
    return new Promise((resolve) => {
      Promise.all(arr).then((allData) => {
        resolve(allData);
      });
    });
  }
};

export default systemService;
