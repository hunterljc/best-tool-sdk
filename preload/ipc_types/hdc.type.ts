export interface IHdcIpc {
  /**
   * 查询设备列表
   * @returns 返回设备列表
   */
  discover: () => Promise<any>;
  /**
   * 查询设备列表
   * @returns 返回设备列表
   */
  searchDevice: () => Promise<any>;
  /**
   * 设备重启
   * @returns null
   */
  rebootDevice: () => Promise<any>;
  /**
   * 进入shell
   * @returns null
   */
  shell: () => Promise<any>;
  /**
   * 查询设备的cpu、内存信息
   * @param usbNumber 设备的sn码，或ip地址
   * @returns 返回CPU、内存信息
   */
  topShell: (usbNumber: string) => Promise<any>;
  /**
   * 建立链接
   * @param ip 要连接设备的ip地址
   * @returns null
   */
  connect: (ip) => Promise<any>;
  /**
   * 安装程序
   * @param packageName 包名，例：hwadmin.hap
   * @returns null
   */
  installApp: (packageName) => Promise<any>;
  /**
   * 卸载程序
   * @param packageName 如 hwadmin.hap 卸载时需要加上包名的前缀 当前包名前缀为 -- com.example. --
   * @returns null
   */
  uninstallApp: (packageName) => Promise<any>;
  /**
   * 更新程序
   * @param packageName 包名：如 hwadmin.hap 需要与要更新的应用同名才可替换
   * @returns null
   */
  updatedApp: (packageName) => Promise<any>;
  /**
   * 上传文件
   * @param uploadUrl 本地上传文件路径 例如 /uploadfDir/a.txt
   * @param targetUrl 目标路径 例如 system/usr
   * @returns null
   */
  sendFile: ({ uploadUrl, targetUrl }) => Promise<any>;
  /**
   * 下载文件
   * @param targetUrl 目标路径 例如 system/usr
   * @param localUrl 目标路径 例如 system/usr
   * @returns null
   */
  reciveFile: ({ targetUrl, localUrl }) => Promise<any>;
  /**
   * 杀死进程
   * @returns null
   */
  kill: () => Promise<any>;
  /**
   * 检测网络
   * @param ip ip地址
   * @returns true | false
   */
  pingIP: (ip) => Promise<true | false>;
  /**
   * 列出所有文件，除了.和...，每行一个文件
   * @returns 文件列表
   */
  fileTreeTopShell: () => Promise<any>;
  /**
   * 跳转至该路径 并列出当前的文件，不加参数为回到根目录或"/"
   * @param filePath 路径
   * @returns 文件列表
   */
  fileTreeShell: (filePath: string) => Promise<any>;
  /**
   * 更新系统
   * @param file 更新包名，如：updater_full.zip
   * @returns
   */
  update: (file) => Promise<any>;
  /**
   * 获取已安装的设备列表
   * @param usbIpNumber
   * @returns
   */
  getInstalledPackage: (usbIpNumber) => Promise<any>;
  /**
   * 获取设备系统信息
   * @param usbIpNumber
   * @returns
   */
  getSystemInfo: (usbIpNumber) => Promise<any>;
  /**
   * 获取指定设备的core模块的日志内容
   * @param key
   * @returns
   */
  getCoreLog: (key) => Promise<any>;
  /**
   * 获取指定设备的init模块的日志内容
   * @param key
   * @returns
   */
  getInitLog: (key) => Promise<any>;
  /**
   * 获取指定设备的app模块的日志内容
   * @param key
   * @returns
   */
  getAppLog: (key) => Promise<any>;
  /**
   * 获取指定设备的kmsg模块的日志内容
   * @param key
   * @returns
   */
  getKmsgLog: (key) => Promise<any>;
}
