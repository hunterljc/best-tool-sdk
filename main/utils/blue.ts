const { SerialPort } = require("serialport");
import { Callback } from "../../types/common";
import type { SerialPort as SP } from "serialport";

// 创建蓝牙对象
class BlueTooth {
  port!: SP | null;
  // 扫描端口
  public async scanPortlist() {
    const ports = await SerialPort.list();
    return ports;
  }

  // 连接端口
  public connectNewBlue(path: string) {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({ path: path, baudRate: 115200 }, (err) => {
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
  // 进入AT
  public entryAT() {
    this.port && this.port.isOpen && this.port.write("+++");
  }
  // 退出AT
  public outAT() {
    setTimeout(() => {
      this.port && this.port.isOpen && this.port.write("AT+EXIT" + "\r\n");
    }, 2000);
  }

  // 扫描mac地址
  public portwrite() {
    setTimeout(() => {
      this.port && this.port.isOpen && this.port.write("AT+SCAN" + "\r\n");
    }, 2000);
  }

  // 手动连接
  public manualconnectMacBll(val) {
    setTimeout(() => {
      this.port && this.port.write("AT+CONNECT=," + val + "\r\n");
    }, 1000);
  }

  // 自动连接
  public connectMacBll(val) {
    this.port && this.port.write("AT+CONNECT=," + val + "\r\n");
  }
  //
  // 0：slave，单从角色（默认角色）
  // 1：master，单主角色
  // 2：slave and master，主从一体
  // 3：beacon，可连接广播（此模式下串口默认处于关闭状态不可用，可通过重新拉低CTS 脚来使能串口）
  // 设置设备当前角色为 master 主角色重启后生效、掉电保存
  public setRole() {
    setTimeout(() => {
      this.port && this.port.write(`AT+ROLE=2` + "\r\n");
    }, 1000);
  }
  public reStart() {
    setTimeout(() => {
      this.port && this.port.write(`AT+RESTART` + "\r\n");
    }, 2000);
  }

  // 查询角色
  // AT+ROLE=?
  public queryRole() {
    setTimeout(() => {
      this.port && this.port.write(`AT+ROLE?` + "\r\n");
    }, 2000);
  }
  public writeBin(val) {
    this.port && this.port.write(val);
  }

  // 对比包是否相同
  public writePake(val) {
    this.port && this.port.write(val);
  }
}

export default new BlueTooth();
