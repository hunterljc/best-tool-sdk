import logger from "electron-log";
import path from "path";

const now = new Date();
const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
logger.transports.file.level = "debug";
logger.transports.file.maxSize = 1002430; // 最大不超过10M
logger.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}"; // 设置文件内容格式
logger.transports.file.fileName = date + ".log"; // 创建文件名格式为 '时间.log' (2023-02-01.log)

// 'error' | 'warn' | 'info' | 'verbose' | 'debug' |
const log = {
  // 指定日志文件夹位置
  setLogPathL: (basePath: string) =>
    (logger.transports.file.resolvePath = () => path.join(basePath, `${date}.log`)),
  error: (info: string) => logger.error(info),
  warn: (info: string) => logger.warn(info),
  info: (info: string) => logger.info(info),
  verbose: (info: string) => logger.verbose(info),
  debug: (info: string) => logger.debug(info)
};

export default log;
