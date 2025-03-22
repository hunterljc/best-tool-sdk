import { globalShortcut, BrowserWindow } from "electron";

export const registryGlobalKey = () => {
  globalShortcut.register("CommandOrControl+Shift+i", function () {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.webContents.openDevTools();
  });
};
