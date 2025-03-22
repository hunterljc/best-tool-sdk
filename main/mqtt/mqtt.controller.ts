import { ipcMain, IpcMainEvent, BrowserWindow } from "electron";
import { mqttConstant } from "../config/constants";
import mqtt from "mqtt";
import WindowManager from "../window/window.manager";

const mqttEvent = () => {
  let client: any = null;
  let mainWindow: BrowserWindow | undefined;
  ipcMain.on(mqttConstant.connect, (_event, host: string, port: number, winUrl: string) => {
    try {
      mainWindow = WindowManager.getInstance().getWindow(winUrl);
      client = mqtt.connect(`mqtt://${host}:${port}`, {
        keepalive: 30
      });

      client.on("connect", () => {
        mainWindow?.webContents.send(mqttConstant.onmessage, {
          code: 200,
          topic: "",
          msg: "连接成功！"
        });
      });

      client.on("message", (topic, message) => {
        mainWindow?.webContents.send(mqttConstant.onmessage, {
          code: 300,
          topic,
          msg: message.toString()
        });
      });
    } catch (error) {
      console.log(String(error));
    }
  });

  // 订阅主题
  ipcMain.on(mqttConstant.subscribe, (_event: IpcMainEvent, theme: string) => {
    if (client) {
      mainWindow?.webContents.send(mqttConstant.onmessage, {
        code: 200,
        topic: "",
        msg: `订阅主题：${theme}`
      });
      client.subscribe(theme, (err) => {
        console.log("subscribe==", err);
        if (err) {
          mainWindow?.webContents.send(mqttConstant.onmessage, {
            code: 400,
            topic: "",
            msg: `订阅失败`
          });
        }
      });
    }
  });

  // 取消订阅主题
  ipcMain.on(mqttConstant.unsubscribe, (_event: IpcMainEvent, theme: string) => {
    if (client) {
      client.unsubscribe(theme, (err) => {
        console.log("unsubscribe==", err);
        if (!err) {
          mainWindow?.webContents.send(mqttConstant.onmessage, {
            code: 200,
            topic: "",
            msg: "取消订阅！"
          });
        } else {
          mainWindow?.webContents.send(mqttConstant.onmessage, {
            code: 400,
            topic: "",
            msg: `取消订阅失败`
          });
        }
      });
    }
  });

  // 取消订阅
  ipcMain.on(mqttConstant.end, (_event: IpcMainEvent) => {
    if (client) {
      client.end();
      mainWindow?.webContents.send(mqttConstant.onmessage, {
        code: 200,
        topic: "",
        msg: "断开连接..."
      });
    }
  });
};

export default mqttEvent;
