import { ipcRenderer } from "electron";
import { IGitIpc } from "../ipc_types/git.type";
import { apiEvent } from "../../../main/config/constants";
import { IGitMsg } from "../../../types/common";

const gitIpc: IGitIpc = {
  clone: (addr: string, dist: string): Promise<IGitMsg> =>
    ipcRenderer.invoke(apiEvent.git, "clone", addr, dist),
  setUrl: (url: string): void => ipcRenderer.send(apiEvent.git, "setUrl", url),
  push: (msg: string): Promise<IGitMsg> => ipcRenderer.invoke(apiEvent.git, "push", msg),
  pull: (): void => ipcRenderer.send(apiEvent.git, "pull")
};

export default gitIpc;
