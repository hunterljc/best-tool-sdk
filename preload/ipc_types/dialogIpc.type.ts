import {
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
  MessageBoxOptions,
  MessageBoxReturnValue
} from "electron";

export interface DialogIpc {
  showOpenDialog: (url: string, options: OpenDialogOptions) => Promise<OpenDialogReturnValue>;
  showSaveDialog: (url: string, options: SaveDialogOptions) => Promise<SaveDialogReturnValue>;
  showMessageBox: (url: string, options: MessageBoxOptions) => Promise<MessageBoxReturnValue>;
  showErrorBox: (title: string, content: string) => void;
}
