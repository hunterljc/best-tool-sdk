/**
 * 基础路径
 */
export interface basepath {
  appDirPath: string;
  desktopPath: string;
  userDirPath: string;
  pluginDirPath: string;
  pluginHtmlPath: string;
  dbDirPath: string;
  logDirPath: string;
  projectFilePath: string;
  recordsDirPath: string;
  tempDir: string;
  curProgramDirPath: string;
  curPackagePath: string;
}

export interface Ipath {
  getBasePath: (product_model_name: string, plugin_name: string) => Promise<basepath>; // 获取应用相关目录
  pathJoin: (...args: string[]) => string; // 合并url
  pathProcess: (...args: string[]) => string;
  pathBaseName: (arg: string) => string;
  pathDirName: (arg: string) => string;
}
