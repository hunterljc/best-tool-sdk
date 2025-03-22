// import {PDP_REBOOT,//重启
//     PDP_SYNC_WAIT,//同步等待
//     PDP_GET_NODE_VER,//查询版本
//     PDP_DATA_BLOCK_DESC,//数据描述
//     PDP_DISCONNECT,//断开连接
//     PDP_KEEP_ALIVE,//持久连接
//     PDP_CONNECT ,//第一次建立连接
//     PDP_DATA_BLOCK_CRC,//crc校验
//     PDP_NODE_STATE_UPLOAD,//节点工况数据报送
// } from '@/render/zmospump01/config/PumpOrders';

import { Callback, INet } from "../../types/common";
const dgram = require("dgram");

export default class NetworkUdp {
  private static client;
  // 网服务端发送消息
  static transmit(net: INet, data: any): void {
    try {
      const info = Buffer.from(data);
      if (this.client) {
        this.client.send(info, 0, info.length, net.port, net.ip, (_err, _bytes) => {});
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 开始侦听消息和接受消息
  static listing(net: INet, onMessage: Callback): void {
    this.client = dgram.createSocket("udp4");
    // console.log('准备监听listing')
    // 让UDP套字节接受网络消息

    this.client.bind(net.port, net.ip);
    //  0x1770    0xbf,0xa9   191.169.1.254
    // console.log("准备监听");
    this.client.on("message", (msg, rinfo) => {
      // 让Buffer转为数组buffer
      onMessage(msg);
    });
    //关闭时触发
    this.client.on("close", () => {
      console.log("socket已关闭");
    });
    // 发生错误时触发
    this.client.on("error", (err) => {
      console.log("error====", String(err));
    });
  }

  static closeServer(): void {
    if (this.client) this.client.close();
    this.client = null;
  }
}
