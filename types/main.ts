// 此处仅定义主进程类型
import { IpcMainEvent } from "electron";

export type IpcMainCallback = (event: IpcMainEvent, ...args: any[]) => void;
