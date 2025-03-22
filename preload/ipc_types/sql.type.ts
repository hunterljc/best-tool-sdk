import { IResourceTreeItem } from "../../../main/utils/sql/type";
import { IQueryMax, IcheckString } from "../../../types/sql";

export interface SqlIpc {
  all: (str: string, dbPath: string) => Promise<unknown>;
  run: (str: string, dbPath: string) => Promise<unknown>;
  runArr: (arr: Array<string>, dbPath: string) => Promise<unknown>;
  queryData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  addData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  editData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  delData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  queryOneData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  queryTrueData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  checkData: (param: unknown[]) => object;
  findData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  delAndEdit: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  queryFuzzytype: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  queryFuzzy: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  queryMax: (param: IQueryMax, dbPath: string) => Promise<unknown>;
  checkString: (param: IcheckString, dbPath: string) => Promise<unknown>;
  queryChooseData: (param: Array<unknown>, dbPath: string) => Promise<unknown>;
  transformResourceTree: (param: Array<IResourceTreeItem>, dbPath: string) => Promise<unknown>;
}
