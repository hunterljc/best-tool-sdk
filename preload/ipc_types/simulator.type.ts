// 设备发现
export interface ISimulatorIpc {
  open: () => Promise<any>;
  close: () => void;
}
