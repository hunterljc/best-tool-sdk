import { Callback, INet } from "../../types/common";
const Net = require("net");

export default class NetworkTcp {
  private static client;
  // 网服务端发送消息
  static transmit(_net: INet, Data: any) {
    try {
      const info = Buffer.from(Data);
      // console.log('xxxxxxxxxx',dStore04.ipAttributeObj.targetPort, dStore04.ipAttributeObj.targetIp);
      /* 向服务器发送16进制的数据 */
      if (this.client) {
        this.client.write(info);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 开始侦听消息和接受消息
  static listing(net: INet, onMessage: Callback): void {
    // console.log('准备监听listing')
    // 让UDP套字节接受网络消息
    this.client = Net.Socket();

    // const HOST = '192.168.0.178'; //服务器地址
    // const PORT = '4002'; //服务器端口
    this.client.connect(net.port, net.ip, () => {
      console.log("连接成功");
    });
    /* 监听服务器传来的data数据 */
    this.client.on("data", function (data) {
      onMessage(data);
    });

    /* 监听end事件 */
    this.client.on("end", function () {
      console.log("end");
    });

    /* 监听error事件 */
    this.client.on("error", function () {
      console.log("error");
    });
  }

  static closeServer() {
    if (this.client) this.client.end();
    this.client = null;
  }
}
