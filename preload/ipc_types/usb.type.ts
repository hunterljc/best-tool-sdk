import { usb } from "usb";

export interface IusbObj {
  usb: typeof usb;
  getDeviceList: () => Promise<USBDevice[]>;
  attach: (callback: Function) => void;
  detach: (callback: Function) => void;
  removeattach: () => void;
}
