#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

//读取package.json文件内模块信息
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));

let mstr = { imp: "", fun: "" };
let wstr = { imp: "", fun: "" };

// 以下插件只在主进程注册， worker不注册
const main = ["blue", "serialport", "ssh", "process"];

pkg.zmosmodule.forEach((c) => {
  let f = capitalizeFirstLetter(c);
  // 获取主进程字符
  mstr.imp += `import { register${f}WorkService } from "./${c}"; \n`;
  mstr.fun += ` register${f}WorkService(); \n`;

  const has = main.some(k => k === c);
  if (!has) {
    // 获取worker字符
    wstr.imp += `import ${c}Handler from "./handler/${c}.handler"; \n`;
    wstr.fun += `workerEventEmitter.on(workerEvent.${c}, ${c}Handler); \n`;
  }
});

// 定义文件内容，写入
const content_module = `
import { registerWindowManagerService } from "./window";
import { registerDialogService } from "./dialog";
import { registerSystemService } from "./system";
import { registerDownloadService } from "./download";
import { registerFsService } from "./fs";
import { registerCryptoService } from "./crypto";
import { registerBufferWorkService } from "./buffer";
${mstr.imp}

const registerMainListenerEvent = () => {
  registerWindowManagerService();
  registerDialogService();
  registerSystemService();
  registerDownloadService();
  registerFsService();
  registerCryptoService();
  registerBufferWorkService();
 ${mstr.fun}
};

export default registerMainListenerEvent;
`;

//==============================适配worker=============================

// 定义文件内容，写入
const content_worker = `
import { workerEvent } from "../config/worker.config";
import { workerEventEmitter } from "../../common/worker-emitter";
import fsHandler from "./handler/fs.handler";
import cryptoHandler from "./handler/crypto.handler";
import downloadHandler from "./handler/download.handler";
${wstr.imp}

workerEventEmitter.on(workerEvent.fs, fsHandler);
workerEventEmitter.on(workerEvent.crypto, cryptoHandler);
workerEventEmitter.on(workerEvent.download, downloadHandler);
${wstr.fun}
`;

setTimeout(() => {
  // 写入modules文件
  writeFile("modules.ts", content_module);

  // 写入worker文件
  writeFile("worker/worker.ts", content_worker);
}, 1000);

// 模块首字母大写
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 重写文件
const writeFile = (filePath, content) => {
  // 组合路径和文件名
  const src = path.join(process.cwd(), `./node_modules/hd-plugin-sdk/main/`, filePath);
  // 通过 fs.writeFile 创建新文件
  fs.writeFileSync(src, content, "utf8");
};
