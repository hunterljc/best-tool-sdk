import { IOrm } from "../ipc_types/orm.type";
import { ipcRenderer } from "electron";
import { apiEvent } from "../../../main/config/constants";

const IOrm: IOrm = {
  /**
   * @returns 获得的结果为JSON.stringify()，请转换JSON.parse
   */
  getTableNamesByDB: (file_path: string): Promise<any> =>
    ipcRenderer.invoke(apiEvent.orm, "getTableNamesByDB", file_path),
  getContentByTableAndFile: (file_path: string, table: any): Promise<any> =>
    ipcRenderer.invoke(apiEvent.orm, "getContentByTableAndFile", file_path, table),
  getContentBySqlAndFile: (file_path: string, sql: any): Promise<any> =>
    ipcRenderer.invoke(apiEvent.orm, "getContentBySqlAndFile", file_path, sql),
  getContentBySqlAndParam: (file_path: string, sql: any, parameters?: any[]): Promise<any> =>
    ipcRenderer.invoke(apiEvent.orm, "getContentBySqlAndParam", file_path, sql, parameters),
  closeDefaultConnection: (): Promise<void> =>
    ipcRenderer.invoke(apiEvent.orm, "closeDefaultConnection"),
  typeorm: undefined
};

export default IOrm;
