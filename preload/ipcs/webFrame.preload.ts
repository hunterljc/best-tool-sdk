// 窗口缩放工具
import { webFrame } from "electron";

const setZoomFactor = (ratio: number): void => {
  webFrame.setZoomFactor(ratio);
};

export default setZoomFactor;
