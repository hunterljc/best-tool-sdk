import { usb, WebUSB, getDeviceList, useUsbDkBackend, WebUSBDevice } from "usb";

// const devices: usb.Device[] = getDeviceList();
// console.log('devices11', devices );
const customWebUSB = new WebUSB({
  // Bypass cheking for authorised devices
  allowAllDevices: true
});
const usbObj = {
  usb: usb,
  getDeviceList: async () => {
    // Uses blocking calls, so is async
    // 使用WebUSB方法列出授权设备
    const devices = await customWebUSB.getDevices();
    console.log("devices", devices);
    return devices;
  },
  // 插入USB设备
  attach: (callback: Function) =>
    customWebUSB.addEventListener("connect", (device: any) => callback(device)),
  // 拔出USB设备
  detach: (callback: Function) =>
    customWebUSB.addEventListener("disconnect", (device: any) => callback(device)),
  // 移除监听
  removeattach: () => {
    customWebUSB.removeEventListener("connect", getDeviceList);
    customWebUSB.removeEventListener("disconnect", getDeviceList);
  }
};

export default usbObj;
