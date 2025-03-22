import path from "path";
// import { shell } from "electron";

/**
 * 时间间隔
 * @param timestamp
 * @returns boolean
 */
function blockTiming(timestamp: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timestamp);
  });
}

const ENV = process.env.NODE_ENV === "development";
// 进入系统： hdc.exe shell  退出 exit
// 重启后设置权限命令:  hdc shell mount -o rw,remount /
var exec = require("child_process").execFile;

export default class HDC {
  public static host = "192.168.119.52:8710";
  public static hdcPath = path.join(process.cwd(), "resources", "dll", "hdc.exe");
  // 查询设备列表指令：hdc list targets -v
  public static async discover() {
    //发现设备需要先将hdc进程结束掉

    //系统提示音
    // shell.beep();
    let res = await this.run("discover", "发现设备");
    await blockTiming(1000);
    await this.kill();
    return res;
  }

  // 查询设备列表指令：hdc list targets -v
  public static async searchDevice() {
    let res = await this.run("list targets -v", "发现设备");
    await blockTiming(1000);
    await this.kill();
    return res;
  }

  //设备重启命令：hdc target boot
  /**
   * @returns 重启命令，目前重启不可用
   * 重启会修改IP,导致后续功能无法使用
   */
  public static async rebootDevice() {
    return await this.run("target boot", "设备重启");
  }

  // 建立链接指令: hdc -t key shell  进入到指定设备的shell
  public static async shell() {
    return await this.run(`shell`, "进入shell");
  }

  // 返回CPU、内存信息指令: hdc -t key top shell
  public static async topShell(usbNumber: string) {
    console.log("in--function--------------");
    const res = await this.run(`-t ${usbNumber} shell top`, "");
    return res;
  }

  // 列出所有文件，除了.和...，每行一个文件
  public static async fileTreeTopShell() {
    return await this.run(`shell ls -lA`, "");
  }

  // 跳转至该路径 并列出当前的文件，不加参数为回到根目录或"/"
  public static async fileTreeShell(filePath: string) {
    return await this.run(`shell cd ${filePath} ; ls -lA`, "");
  }
  // 更新系统 reboot updater:--update_package=data/ota_package/updater_full.zip
  public static async update(file: string) {
    return await this.run(`shell reboot updater:--update_package=${file} `, "");
  }

  // 建立链接指令: hdc tconn host[:port][
  public static async connect(ip: string) {
    console.log("ip----", ip);
    return await this.run(`tconn ${ip}`, "建立链接");
  }

  /**
   * 安装程序
   * @param PackageName 包名：如 hwadmin.hap
   */
  public static async installApp(packageName) {
    return await this.run(`install -r ${packageName}`, "安装应用");
  }

  /**
   * 卸载程序
   * @param PackageName 包名：
   * 如 hwadmin.hap 卸载时需要加上包名的前缀 当前包名前缀为 -- com.example. --
   */
  public static async uninstallApp(packageName) {
    return await this.run(`uninstall ${packageName}`, "卸载应用");
  }

  /**
   * 更新程序
   * @param PackageName 包名：如 hwadmin.hap 需要与要更新的应用同名才可替换
   */
  public static async updatedApp(packageName) {
    return await this.run(`install -r ${packageName}`, "应用升级成功");
  }

  //
  /**
   * 上传文件  file send local remote
   * @param uploadUrl 本地上传文件路径 例如 /uploadfDir/a.txt
   * @param targetUrl 目标路径 例如 system/usr
   */
  public static async sendFile({ uploadUrl, targetUrl }) {
    //  -a  -s -z -m
    return await this.run(`file send ${uploadUrl} ${targetUrl}`, "上传文件");
  }

  /**
   * 下载文件 file recv [-a] remote local
   * @param targetUrl  目标路径
   * @param localUrl  本地下载路径
   */
  public static async reciveFile({ targetUrl, localUrl }) {
    console.log("targetUrl,localUrl", targetUrl, localUrl);
    return await this.run(`file recv ${targetUrl} ${localUrl}`, "拉取文件");
  }

  // 杀死进程
  public static async kill() {
    return await this.run("kill", "杀掉服务");
  }

  // 执行命令
  public static run(order: string, type: string) {
    return new Promise((resolve, reject) => {
      try {
        exec(this.hdcPath, order.split(" "), function (err: string, data: string) {
          if (!err) {
            console.log(`${type}`, data);
            resolve(`${type}` + data);
          } else {
            console.log(`${type}失败:`, err);
            resolve(`${type}失败` + err);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 检测网络
   */
  public static pingIP(ip) {
    return new Promise((resolve, rejects) => {
      exec("ping", [ip], (err, data) => {
        resolve(!err ? true : false);
      });
    });
  }
  /**
   * 获取已安装的设备列表
   */
  public static async getInstalledPackages(usbIpNumber: any) {
    return await this.run(`.\\hdc -t ${usbIpNumber} shell bm dump -a`, "获取已安装的包信息");
  }
  /**
   * 获取设备系统信息
   */
  public static async getSystemInfo(usbIpNumber: any) {
    return await this.run(`.\\hdc -t ${usbIpNumber} shell hidumper -c base`, "获取设备系统信息");
  }
  /**
   * 获得指定设备的core模块的日志内容
   */
  public static async getCoreLog(key: any) {
    return await this.run(`.\\hdc -t ${key} shell hilog -t core -x`, "");
  }
  /**
   * 获得指定设备的init模块的日志内容
   */
  public static async getInitLog(key: any) {
    return await this.run(`.\\hdc -t ${key} shell hilog -t init -x`, "");
  }
  /**
   * 获得指定设备的app模块的日志内容
   */
  public static async getAppLog(key: any) {
    return await this.run(`.\\hdc -t ${key} shell hilog -t app -x`, "");
  }
  /**
   * 获得指定设备的kmsg模块的日志内容
   */
  public static async getKmsgLog(key: any) {
    return await this.run(`.\\hdc -t ${key} shell hilog -t kmsg -x`, "");
  }
}
