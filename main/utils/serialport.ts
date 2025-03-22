const { SerialPort } = require("serialport");
import { Callback } from "../../types/common";
import type { SerialPort as SP } from "serialport";

// 创建串口对象
class BlueTooth {
  port!: SP | null;
  // 扫描端口
  public async scanPortlist() {
    const ports = await SerialPort.list();
    return ports;
  }

  // 连接端口
  public connectNewBlue(path: string, botr: number) {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({ path: path, baudRate: botr }, (err) => {
        if (err) {
          resolve({
            type: "error",
            msg: "端口打开失败，无效端口!"
          });
        }
        resolve({
          type: "success",
          msg: "端口打开成功!"
        });
      });
    });
  }

  // 关闭端口
  public closePort(): void {
    if (this.port && this.port.isOpen) {
      this.port.close((err) => {
        console.log(err);
      });
      this.port = null;
    }
  }

  // 监听
  public portRead(onMessage: Callback) {
    if (this.port) {
      this.port.on("data", (data) => {
        // 发消息
        onMessage(data.toString());
      });

      // 串口断开事件
      this.port.on("close", (err) => {
        console.log("==================close:");
        onMessage("连接断开");
      });

      // 错误事件
      this.port.on("error", (err) => {
        console.log("==================error");
        onMessage("连接出错");
      });
    }
  }

  // 发送数据包
  public writeBin(val) {
    this.port && this.port.write(val);
  }

  // 对比包是否相同
  public writePake(val) {
    this.port && this.port.write(val);
  }
}

export default new BlueTooth();
