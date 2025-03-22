// child_process 模块提供了四个创建子进程的函数，分别为：spawn、execFile、exec、fork
const exec = require("child_process").exec;
const path = require("path");

import { IGitMsg } from "../../types/common";

class ChildProcess {
  // 子进程名称
  workerProcess = null;
  // git地址
  gitPath = "";
  // 构建git命令
  gitCloneCommand = "git clone";
  gitPullCommand = "git pull";
  gitAddCommand = `git add .`;
  gitCommitCommand = `git commit -m`;
  gitPushCommand = "git push";

  constructor() {}

  // 克隆项目
  async clone(addr: string, dist: string) {
    return new Promise((resolve, reject) => {
      exec(
        `${this.gitCloneCommand} ${addr}`,
        {
          cwd: dist,
          encoding: "utf8"
        },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve(this.rMsg(false, `clone失败！: ${stderr}`));
          }
          resolve(this.rMsg(true, `clone成功！`));
        }
      );
    });
  }

  // 设置项目路径
  setUrl(url: string): void {
    this.gitPath = path.normalize(url);
  }

  // 拉取代码
  async pull(): Promise<void> {
    await this.command(this.gitPullCommand);
  }

  // 推送代码
  async push(msg: string): Promise<IGitMsg> {
    let res, info;

    if (!this.gitPath) {
      info = "仓库路径为空！";
      return this.rMsg(false, info);
    }

    res = await this.command(this.gitPullCommand);
    if (!res) {
      info = "拉取代码异常";
      return this.rMsg(res, info);
    }

    res = await this.command(this.gitAddCommand);
    if (!res) {
      info = "工作文件提交暂存区异常";
      return this.rMsg(res, info);
    }
    res = await this.command(`${this.gitCommitCommand} "${msg}"`);
    if (!res) {
      info = "提交到本地仓库异常";
      return this.rMsg(res, info);
    }

    res = await this.command(this.gitPushCommand);
    if (!res) {
      info = "推送代码异常";
    } else {
      info = "提交成功";
    }
    return this.rMsg(res, info);
  }

  rMsg(res: boolean, info: string): IGitMsg {
    return {
      type: res,
      info: info
    };
  }

  // 执行git命令
  command(cmd: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      exec(cmd, { cwd: this.gitPath, encoding: "utf8" }, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          console.error(`stderr: ${stderr}`);
          console.log(`stdout: ${stdout}`);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}

export default new ChildProcess();
