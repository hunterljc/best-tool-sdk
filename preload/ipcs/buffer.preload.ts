import { ipcRenderer } from "electron";
import { BufferIpc } from "../ipc_types/bufferIpc.type";
import { apiEvent } from "../../../main/config/constants";

const bufferIpc: BufferIpc = {
  alloc: (num: number) => ipcRenderer.invoke(apiEvent.bufferOn, "alloc", num),
  concat: (arr: number[], size: number) =>
    ipcRenderer.invoke(apiEvent.bufferOn, "concat", arr, size),
  from: (str: string | number[]) => ipcRenderer.invoke(apiEvent.bufferOn, "from", str)
};

export default bufferIpc;
