export interface IOrm {
  typeorm: any;
  getTableNamesByDB: (file_path: any) => Promise<any>;
  getContentByTableAndFile: (file_path: any, table: any) => Promise<any>;
  getContentBySqlAndFile: (file_path: any, sql: any) => Promise<any>;
  getContentBySqlAndParam: (file_path: any, sql: any, parameters?: any[]) => Promise<any>;
  closeDefaultConnection: () => Promise<any>;
}
