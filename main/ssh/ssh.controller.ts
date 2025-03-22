import { ipcMain, IpcMainEvent } from "electron";
import { sshConstant } from "../config/constants";
import { Client } from "ssh2";
import log from "../utils/logger";
import WindowManager from "../window/window.manager";

const listenerEvent = () => {
  const sshList: Map<string, Client> = new Map();
  let streamObj: any = null;
  ipcMain.on(
    sshConstant.connect,
    (_event, host: string, port: number, username: string, password: string, winUrl: string) => {
      try {
        const mainWindow = WindowManager.getInstance().getWindow(winUrl);
        const find = sshList.get(host);
        if (!find) {
          const ssh = new Client();
          sshList.set(host, ssh);

          ssh
            .on("ready", () => {
              mainWindow?.webContents.send(sshConstant.onStream, stringToU8("连接成功!\r\n"));
              ssh?.shell((err, stream) => {
                if (err) {
                  log.error(`${err}`);
                }
                streamObj = stream;
                stream
                  .on("data", (data) => {
                    mainWindow?.webContents.send(sshConstant.onStream, data);
                  })
                  .on("close", () => {
                    destroy(host);
                  });
              });
            })
            .on("close", () => {
              mainWindow?.webContents.send(
                sshConstant.onStream,
                stringToU8("连接断开，请检测网络！\r\n")
              );
              destroy(host);
              log.info("ssh==close==");
            })
            .on("error", (error) => {
              mainWindow?.webContents.send(
                sshConstant.onStream,
                stringToU8(`连接出错，请检查网络: ${error}\r\n`)
              );
              destroy(host);
              log.error("ssh==error==", `${error}`);
            })
            .connect({
              host,
              port,
              username,
              password
            });
        }
      } catch (error) {
        console.log(String(error));
      }
    }
  );

  // 监听输入流
  ipcMain.on(sshConstant.sendWrite, (_, chunk) => {
    if (streamObj) {
      streamObj.write(chunk);
    }
  });

  ipcMain.on(sshConstant.destory, (_event: IpcMainEvent, host: string) => {
    destroy(host);
  });

  const destroy = (host: string) => {
    const ssh = sshList.get(host);
    if (ssh) {
      ssh?.destroy();
      sshList.delete(host);
    }
  };
};

// 字符串转 uint8Array
const stringToU8 = (str: string) => {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);
  return uint8Array;
};

export const registerSSHListenerEvent = () => {
  listenerEvent();
};
