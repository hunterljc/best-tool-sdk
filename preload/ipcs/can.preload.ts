import { ipcRenderer } from "electron";
import { IcanIpc } from "../ipc_types/can.type";
import { apiEvent } from "../../../main/config/constants";

const canIpc: IcanIpc = {
  init: (DevType: number, DevIndex: number, CANIndex: number): Promise<boolean> =>
    ipcRenderer.invoke(apiEvent.canHandle, "init", DevType, DevIndex, CANIndex),
  open: (): Promise<boolean> => ipcRenderer.invoke(apiEvent.canHandle, "open"),
  close: (): Promise<boolean> => ipcRenderer.invoke(apiEvent.canHandle, "close"),
  initCan: (): Promise<boolean> => ipcRenderer.invoke(apiEvent.canHandle, "initCan"),
  startCan: (): Promise<boolean> => ipcRenderer.invoke(apiEvent.canHandle, "startCan"),
  setReference: (pData: Array<number>): Promise<boolean> =>
    ipcRenderer.invoke(apiEvent.canHandle, "setReference", pData),
  transmit: (hex: string, id: string): Promise<unknown> =>
    ipcRenderer.invoke(apiEvent.canHandle, "transmit", hex, id),
  receive: (): Promise<unknown> => ipcRenderer.invoke(apiEvent.canHandle, "receive"),
  switchCANIndex: (CANIndex: number): Promise<boolean> =>
    ipcRenderer.invoke(apiEvent.canHandle, "switchCANIndex", CANIndex)
};

export default canIpc;
