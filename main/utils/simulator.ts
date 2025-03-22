import { SIMULATOR_PATH } from "../config/path.config";
import { execFile } from "child_process";

// 创建串口对象
class Simulator {
  // 扫描端口
  public open(): void {
    const exe = execFile(SIMULATOR_PATH);
    exe.on("exit", (code) => {
      console.log("code", code);
    });
  }

  // 关闭端口
  public close(): void {}
}

export default new Simulator();
