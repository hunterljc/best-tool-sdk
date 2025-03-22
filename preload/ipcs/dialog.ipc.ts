import {
  ipcRenderer,
  OpenDialogOptions,
  SaveDialogOptions,
  MessageBoxOptions,
  OpenDialogReturnValue,
  SaveDialogReturnValue,
  MessageBoxReturnValue
} from "electron";
import { DialogIpc } from "../ipc_types/dialogIpc.type";
import { apiEvent } from "../../../main/config/constants";

const dialogIpc: DialogIpc = {
  // 打开文件窗口
  showOpenDialog: (url: string, options: OpenDialogOptions): Promise<OpenDialogReturnValue> =>
    ipcRenderer.invoke(apiEvent.dialog, "showOpenDialog", url, options),
  // 保存文件窗口
  showSaveDialog: (url: string, options: SaveDialogOptions): Promise<SaveDialogReturnValue> =>
    ipcRenderer.invoke(apiEvent.dialog, "showSaveDialog", url, options),
  // 信息窗口
  showMessageBox: (url: string, options: MessageBoxOptions): Promise<MessageBoxReturnValue> =>
    ipcRenderer.invoke(apiEvent.dialog, "showMessageBox", url, options),
  // 报错窗口
  showErrorBox: (title: string, content: string): void =>
    ipcRenderer.send(apiEvent.dialogOn, "showErrorBox", title, content)
};

export default dialogIpc;
