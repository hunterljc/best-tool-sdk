import { Client } from "node-scp";

export default class scpUtil {
  public static scpClient;

  //初始化
  public static async init(obj): Promise<void> {
    this.scpClient = await Client({
      host: obj.host,
      port: 22,
      username: obj.username,
      password: obj.password
    });
  }
  //关闭服务
  public static async close(): Promise<void> {
    try {
      await this.scpClient.close();
    } catch (error) {
      console.log("error", error);
    }
  }

  //查看文件列表
  public static async list(remotePath: Array<string>): Promise<unknown> {
    try {
      const res = await this.scpClient.list(remotePath[0]);
      return res;
    } catch (error) {
      return false;
    }
  }

  // 上传文件
  public static async uploadFile(pathArr: Array<string>): Promise<unknown> {
    try {
      const res = await this.scpClient.uploadFile(pathArr[0], pathArr[1]);
      return res;
    } catch (error) {
      return false;
    }
  }

  //上传文件夹
  public static async uploadDir(pathArr: Array<string>): Promise<unknown> {
    try {
      const res = await this.scpClient.uploadDir(pathArr[0], pathArr[1]);
      return res;
    } catch (error) {
      return false;
    }
  }
  //从查看文件是否存在
  public static async exists(remotePath: Array<string>): Promise<unknown> {
    try {
      const res = await this.scpClient.exists(remotePath[0]);
      return res;
    } catch (error) {
      return false;
    }
  }

  // 创建文件夹
  public static async mkdir(remotePath: Array<string>): Promise<unknown> {
    try {
      await this.scpClient.mkdir(remotePath[0]);
      return true;
    } catch (error) {
      return false;
    }
  }

  // 下载文件 remotePath[0] 源地址， remotePath[1] 下载存放地址
  public static async downloadFile(remotePath: Array<string>): Promise<unknown> {
    try {
      await this.scpClient.downloadFile(remotePath[0], remotePath[1]);
      return true;
    } catch (error) {
      return false;
    }
  }
  // 下载文件夹
  public static async downloadDir(remotePath: Array<string>): Promise<unknown> {
    try {
      await this.scpClient.downloadDir(remotePath[0], remotePath[1]);
      return true;
    } catch (error) {
      return false;
    }
  }

  // 删除文件
  public static async unlink(remotePath: Array<string>): Promise<unknown> {
    try {
      const res = await this.scpClient.unlink(remotePath[0]);
      return res;
    } catch (error) {
      return false;
    }
  }
  // 删除文件夹
  public static async rmdir(remotePath: Array<string>): Promise<unknown> {
    try {
      const res = await this.scpClient.rmdir(remotePath[0]);
      return res;
    } catch (error) {
      return false;
    }
  }
}
