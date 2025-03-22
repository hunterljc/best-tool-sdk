// 设备发现
import { IGitMsg } from "../../../types/common";

export interface IGitIpc {
  clone: (addr: string, dist: string) => Promise<IGitMsg>;
  setUrl: (url: string) => void;
  push: (msg: string) => Promise<IGitMsg>;
  pull: () => void;
}
