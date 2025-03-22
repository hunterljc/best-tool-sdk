import { BrowserWindowConstructorOptions } from "electron";

type LoadType = "file" | "url";

interface WindowParam extends BrowserWindowConstructorOptions {
  url: string;
  loadType: LoadType;
}

export interface WindowIpc {
  openNormalWindow: (option: WindowParam) => void;
  openPoolWindow: (option: WindowParam) => void;
  closeSingle: (path: string) => void;
  closeAll: () => void;
  max: (path: string) => void;
  unmax: (path: string) => void;
  sendMsg: (args: object) => void;
  onMSg: (callback: Function) => void;
}
