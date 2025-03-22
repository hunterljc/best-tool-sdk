// 设备发现
export interface IcanIpc {
  init: (DevType: number, DevIndex: number, CANIndex: number) => Promise<boolean>;
  open: () => Promise<boolean>;
  close: () => Promise<boolean>;
  initCan: () => Promise<boolean>;
  startCan: () => Promise<boolean>;
  setReference: (pData: Array<number>) => Promise<boolean>;
  transmit: (hex: string, id: string) => Promise<unknown>;
  receive: () => Promise<unknown>;
  switchCANIndex: (CANIndex: number) => Promise<boolean>;
}
