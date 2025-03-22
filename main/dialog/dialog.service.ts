import { dialog } from "electron";
import type { OpenDialogOptions, SaveDialogOptions, MessageBoxOptions } from "electron";
import WindowManager from "../window/window.manager";

const dialogService = {
  showOpenDialog: (url: string, options: OpenDialogOptions): Object => {
    const wind = WindowManager.getInstance().getWindow(url);
    return wind ? dialog.showOpenDialog(wind, options) : dialog.showOpenDialog(options);
  },

  showSaveDialog: (url: string, options: SaveDialogOptions): Object => {
    const wind = WindowManager.getInstance().getWindow(url);
    return wind ? dialog.showSaveDialog(wind, options) : dialog.showSaveDialog(options);
  },

  showMessageBox: (url: string, options: MessageBoxOptions): Object => {
    const wind = WindowManager.getInstance().getWindow(url);
    return wind ? dialog.showMessageBox(wind, options) : dialog.showMessageBox(options);
  },

  showErrorBox: (title: string, content: string): void => {
    dialog.showErrorBox(title, content);
  }
};

export default dialogService;
