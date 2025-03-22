import { registerWindowListenerEvent } from "./window.controller";
import WindowManager from "./window.manager";
import WindowPool from "./pool/window.pool";

export const registerWindowManagerService = (): void => {
  WindowManager.getInstance();
  WindowPool.getInstance().init();
  registerWindowListenerEvent();
};
