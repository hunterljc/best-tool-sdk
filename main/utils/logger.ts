import logger from "electron-log";
// import path from "path";
// import { LOG_PATH } from "../config/path.config";

logger.transports.file.level = "debug";
logger.transports.file.maxSize = 1002430; // 最大不超过10M
logger.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}"; // 设置文件内容格式
const now = new Date();
const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
logger.transports.file.fileName = date + ".log"; // 创建文件名格式为 '时间.log' (2023-02-01.log)

// 指定日志文件夹位置
const LOG_PATH = "./log";
export const loggerHandle = function (_path = LOG_PATH) {
  logger.transports.file.resolvePath = () => _path;
};

export default logger;
