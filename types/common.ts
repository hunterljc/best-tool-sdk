import { IpcRendererEvent } from "electron";
import type BetterSqlite3 from "better-sqlite3";
export type NamePathType =
  | "home"
  | "appData"
  | "userData"
  | "sessionData"
  | "temp"
  | "exe"
  | "module"
  | "desktop"
  | "documents"
  | "downloads"
  | "music"
  | "pictures"
  | "videos"
  | "recent"
  | "logs"
  | "crashDumps";

export type SqliteDatabase = BetterSqlite3.Database;
export interface IWorkerData<T> {
  type: string;
  data: T;
}

export interface INet {
  port: number;
  ip: string;
}

export interface IMsg {
  type: "info" | "success" | "warning" | "error";
  msg: string;
}

export type Callback = (...args) => void | unknown;
export type EmitterListenerHandler = (...args: any[]) => void;

export type IpcRenderCallback = (event: IpcRendererEvent, ...args: any[]) => void;

// 设备发现
export interface IcoapItem {
  type: string;
  name: string;
  scu_no: string;
  scu_ip: string;
  scu_mac: string;
  system_version: string;
  system_name: string;
  system_state: string;
  product_time: string;
  hold_version: string;
  app_version: string;
  reset_state: number;
  process: number;
  complete: number;
  child_process: number;
  process_desc: string;
  selected: boolean;
  level: number;
  handle: number;
  children: [];
  un: boolean;
}

// 06设备发现
export interface ICoap2Item {
  scu_no: number;
  scu_ip: string;
  mask: string;
  gateway: string;
  mac: string;
  name: string;
  type: string;
  service: IServiceItem[];
  system: IDeviceSystem;
  // ====================================
  reset_state: number;
  process: number; // 进度
  complete: number; // 进度完成情况 -1 失败， 0 准备， 1 成功
  child_process: number; // 进度
  process_desc: string; // 进度描述
  selected: boolean; // 是否选中
  handle: number; // 中断传程参数
  level: number; // 层级
  children: [];
  un: boolean; // 异常编号
}

// 06设备发现--完整信息
export interface ISourceCoap2Item {
  addr: number;
  ip: string;
  mask: string;
  gateway: string;
  mac: string;
  name: string;
  type: string;
  service: IServiceItem[];
  system: IDeviceSystem;
}
// 设备发现--服务信息
export interface IServiceItem {
  container_image: string;
  container_name: string;
}
// 设备发现--系统信息
export interface IDeviceSystem {
  node: string;
  "hardware-version": string;
  "software-version": string;
  "systemware-version": string;
  system: string;
  kernel: string;
  arch: string;
  cpu: string;
  memory: string;
}

// git指令返回消息
export interface IGitMsg {
  type: boolean;
  info: string;
}
// mqtt消息
export interface IMqttMsg {
  code: number;
  topic: string;
  msg: string;
}

// 发现iP
export interface IIP4 {
  address: string;
  netmask: string;
  family: string;
  mac: string;
  internal: boolean;
  cidr: string;
}
