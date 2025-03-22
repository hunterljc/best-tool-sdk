import { exec, execFile } from "child_process";
import kill from "tree-kill";
// child_process 模块提供了四个创建子进程的函数，分别为：spawn、execFile、exec、fork

class ProcessUtil {
  workProcess: any;

  // 打开文件夹
  public openDir(url: string): void {
    exec(`start "" ${url}`);
  }

  //  在XX文件夹下执行XX程序
  public async startAPP(programPath: string): Promise<void> {
    try {
      //  { maxBuffer: 1024 * 1024 * 50 }
      this.workProcess = execFile(programPath, {}, (error, stdout, stderr) => {
        if (error) {
          console.error(`execFile error: ${error}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    } catch (err) {
      if (err.code) {
        console.error(err.code);
      } else {
        const { stdout, stderr } = err;
        console.error({ stdout, stderr });
      }
    }
  }
  // 关闭程序
  public closeAPP(): void {
    if (this.workProcess && this.workProcess.hasOwnProperty("pid")) {
      kill(this.workProcess.pid);
    }
  }
}

export default new ProcessUtil();
