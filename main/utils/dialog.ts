import { dialog } from "electron";

const getSavePath = (win): Promise<string> => {
  return new Promise((resolve, _reject) => {
    dialog
      .showOpenDialog(win, {
        title: "请选择配置库保存位置",
        properties: ["openDirectory", "createDirectory"],
        buttonLabel: "保存",
        defaultPath: ""
      })
      .then((res) => {
        resolve(res.filePaths[0]);
      })
      .catch((_err) => {
        resolve("");
      });
  });
};
const getOpenPath = (win): Promise<string> => {
  return new Promise((resolve, _reject) => {
    dialog
      .showOpenDialog(win, {
        title: "请选择文件",
        properties: ["showHiddenFiles", "createDirectory"],
        buttonLabel: "打开",
        defaultPath: ""
      })
      .then((res) => {
        resolve(res.filePaths[0]);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

export { getSavePath, getOpenPath };
