import { ipcRenderer } from "electron";
import { apiEvent } from "../../../main/config/constants";
import { IResourceTreeItem } from "../../../main/utils/sql/type";
import { SqlIpc } from "../ipc_types/sql.type";
import { IQueryMax, IcheckString } from "../../../types/sql";

const sqlIpc: SqlIpc = {
  all: (str: string, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "all", str, dbPath),
  run: (str: string, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "run", str, dbPath),
  runArr: (arr: Array<string>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "runArr", arr, dbPath),
  queryData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "queryData", param, dbPath),
  addData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "addData", param, dbPath),
  editData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "editData", param, dbPath),
  delData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "delData", param, dbPath),
  queryOneData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "queryOneData", param, dbPath),
  queryTrueData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "queryTrueData", param, dbPath),
  checkData: (param: unknown[]): object => {
    // 校验数据是否完整
    const normData = param[0] as object;
    const list = JSON.parse(JSON.stringify(param[1]));
    for (const i in normData) {
      list[i] = list[i] || "";
    }
    return list;
  },
  findData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "findData", param, dbPath),
  delAndEdit: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "delAndEdit", param, dbPath),
  queryFuzzytype: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "queryFuzzytype", param, dbPath),
  queryFuzzy: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "queryFuzzy", param, dbPath),
  queryMax: (param: IQueryMax, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "queryMax", param, dbPath),
  checkString: (param: IcheckString, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "checkString", param, dbPath),
  queryChooseData: (param: Array<unknown>, dbPath: string): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "queryChooseData", param, dbPath),
  transformResourceTree: (
    param: Array<IResourceTreeItem>,
    dbPath: string
  ): Promise<unknown | null> =>
    ipcRenderer.invoke(apiEvent.sql, "transformResourceTree", param, dbPath)
};

export default sqlIpc;
