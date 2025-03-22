import { connect, StringCodec } from "nats";
import { Callback } from "../../types/common";
export default class natsUtil {
  public static natsClient;
  public static sc = StringCodec();

  //初始化
  public static async init(src): Promise<boolean> {
    try {
      this.natsClient = await connect({
        servers: src[0]
      });
      console.log(`connected to ${this.natsClient.getServer()}`);
      if (this.natsClient.getServer()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  //订阅主题
  public static async subscribe(src, callback: Callback) {
    try {
      const s1 = this.natsClient.subscribe(src[0]);
      for await (const m of s1) {
        s1.getSubject();
        console.log("s1.getSubject();==========", s1.getSubject());
        console.log(`[${s1.getProcessed()}]: ${this.sc.decode(m.data)}`);
        callback(`${s1.getSubject()}--${m.subject}--${this.sc.decode(m.data)}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  //发布主题
  public static async publish(src): Promise<unknown> {
    try {
      const res = await this.natsClient.publish(src[0], this.sc.encode(src[1]));
      return res;
    } catch (error) {
      return false;
    }
  }

  // 关闭连接
  public static async closed(): Promise<boolean> {
    try {
      const done = this.natsClient.closed();
      await this.natsClient.close();
      const err = await done;
      console.log("关闭连接", this.natsClient.isClosed());
      return this.natsClient.isClosed();
    } catch (error) {
      return false;
    }
  }

  // 取消订阅
  public static async drain(): Promise<boolean> {
    try {
      await this.natsClient.drain();
      const res = await this.natsClient.isDraining();
      console.log("取消订阅res=====", res);
      return res;
    } catch (error) {
      return false;
    }
  }
}
