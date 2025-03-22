import { app } from "electron";
import { join } from "path";

const ENV = process.env.NODE_ENV === "development";

// 主窗口路径
export const MAIN_WINDOW_PATH = process.env["ELECTRON_RENDERER_URL"]
  ? "/"
  : join(__dirname, "../renderer/index.html");

//主程序窗口路由路径
export const winURL = (path: string): string => {
  const base = ENV ? process.env["ELECTRON_RENDERER_URL"] : `file://${__dirname}/index.html`;
  return base + `/#${path}`;
};

/**
 * 外部资源目录
 */

// 用户目录： C:\Users\用户名\AppData\Roaming\Hdapp
export const USER_PATH = join(app.getPath("userData"), "userPublic");

// 日志目录
export const LOG_PATH = join(USER_PATH, "log");

// db目录
export const NEDB_PATH = join(USER_PATH, "db");

// ==============================================================================================================================
// ==============================================================================================================================

/**
 * 内部资源目录
 */

// export const BASE_INSIDE_PATH = join(
//   process.cwd(),
//   ENV ? "resources" : "resources/app.asar.unpacked/resources/"
// );
export const BASE_INSIDE_PATH = join(process.cwd(), "resources");

// 截屏工具
export const PRINTSCR_PATH = join(BASE_INSIDE_PATH, "printscr/PrintScr.exe");

// 工艺模拟器
export const SIMULATOR_PATH = join(
  BASE_INSIDE_PATH,
  "恒达智控跟机模拟器V0.3/恒达智控跟机模拟器V0.3.exe"
);

// 插件存放目录
export const PLUGIN_PATH = join(ENV ? BASE_INSIDE_PATH : USER_PATH, "plugin");
export const PLUGIN_ZIP_PATH = join(ENV ? BASE_INSIDE_PATH : USER_PATH, "pluginZips");
