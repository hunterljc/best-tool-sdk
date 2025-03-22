import { ipcRenderer } from "electron";
import { IjfrogClient } from "../ipc_types/jfrogClient.type";
import { apiEvent } from "../../../main/config/constants";

const jfrogClient: IjfrogClient = {
  ping: (src: Array<string>) => ipcRenderer.invoke(apiEvent.jfrog, "ping", src),
  download: (src: Array<string>) => ipcRenderer.invoke(apiEvent.jfrog, "download", src),
};

export default jfrogClient;
