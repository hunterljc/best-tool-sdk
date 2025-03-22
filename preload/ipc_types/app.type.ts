import { IIP4, NamePathType } from "../../../types/common";
import { type Systeminformation } from "systeminformation";
export interface ISystemInfo {
  cpuInfo: string;
  diskInfo: string;
  blockDevices: Systeminformation.BlockDevicesData[];
}
export interface AppIpc {
  notification: (title: string, body: string) => void;
  getPath: (name: NamePathType) => Promise<string>;
  openFile: (path: string) => Promise<boolean>;
  openFileInFolder: (path: string) => Promise<boolean>;
  showSaveDialogSync: (winUrl: string) => Promise<string>;
  showOpenDialogSync: (winUrl: string) => Promise<string>;
  getpluginDir: () => Promise<string>;
  getVersion: () => Promise<string>;
  setZoomFactor: (ratio: number) => void;
  getLocalIpAddress: () => Promise<string>;
  getAllIpAddress: () => Promise<IIP4[]>;
  isOnLine: () => Promise<boolean>;
  getSystemInfo: () => Promise<ISystemInfo>;
  initLocal: () => Promise<any>;
  setDirtoType: (pathVal: string) => Promise<any>;
}
