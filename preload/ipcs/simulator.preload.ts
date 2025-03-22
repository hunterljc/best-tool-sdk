import { ipcRenderer } from "electron";
import { ISimulatorIpc } from "../ipc_types/simulator.type";
import { apiEvent } from "../../../main/config/constants";

const simulatorIpc: ISimulatorIpc = {
  // 扫描端口
  open: (): Promise<any> => ipcRenderer.send(apiEvent.simulatorOn, "open"),
  // 关闭端口
  close: (): void => ipcRenderer.send(apiEvent.simulatorOn, "close")
};

export default simulatorIpc;
