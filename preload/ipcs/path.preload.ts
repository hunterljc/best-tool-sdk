import { basename, dirname, join } from "path";
import { Ipath, basepath } from "../ipc_types/path.type";
import systemIpc from "./app.preload";
import fsIpc from "./fs.ipc";

/**
 * 获取用户目录
 */
const getBasePath = async (product_model_name: string, plugin_name: string): Promise<basepath> => {
  // 获取应用根目录
  const appDirPath = await systemIpc.getPath("appData");
  // 获取应用根目录
  const desktopPath = await systemIpc.getPath("desktop");
  // 获取用户目录
  const userDirPath = join(await systemIpc.getPath("userData"), "userPublic");
  fsIpc.ensureDirSync(userDirPath);
  // 插件存储目录
  const pluginDirPath = join(userDirPath, product_model_name);
  // 插件渲染层目录
  const pluginHtmlPath = join(userDirPath, plugin_name);
  fsIpc.ensureDirSync(pluginDirPath);
  // 【主程序】公共数据库目录
  const dbDirPath = join(userDirPath, "db");
  fsIpc.ensureDirSync(dbDirPath);
  // 【插件】日志目录
  const logDirPath = join(pluginDirPath, "log");
  fsIpc.ensureDirSync(logDirPath);
  // 【插件】临时文件
  const tempDir = join(pluginDirPath, "temp");
  fsIpc.ensureDirSync(tempDir);
  // 【插件-测试工程】本地工程文件
  const projectFilePath = join(pluginDirPath, "project.json");
  fsIpc.ensureFile(projectFilePath);
  // 【插件】维护记录目录
  const recordsDirPath = join(pluginDirPath, "records");
  fsIpc.ensureDirSync(recordsDirPath);
  // 【插件】程序目录
  const curProgramDirPath = join(pluginDirPath, "program");
  fsIpc.ensureDirSync(curProgramDirPath);

  // 【插件】维护包目录
  const curPackagePath = join(pluginDirPath, "package");
  fsIpc.ensureDirSync(curPackagePath);

  return {
    appDirPath,
    desktopPath,
    userDirPath,
    pluginDirPath,
    pluginHtmlPath,
    dbDirPath,
    logDirPath,
    tempDir,
    projectFilePath,
    recordsDirPath,
    curProgramDirPath,
    curPackagePath
  };
};

/**
 * 封装path.join
 */
const pathJoin = (...args: string[]): string => join(...args);
const pathProcess = (...args: string[]): string => join(process.cwd(), ...args);
// 从路径获取文件名
const pathBaseName = (arg: string): string => basename(arg);
// 从路径获取文件夹路径
const pathDirName = (arg: string): string => dirname(arg);

const pathIpc: Ipath = {
  getBasePath,
  pathJoin,
  pathProcess,
  pathBaseName,
  pathDirName
};

export default pathIpc;
