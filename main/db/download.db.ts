import BaseDbProvider from "./db.provider";
import { SqliteDatabase } from "../../types/common";
import { DbConfig } from "../config/db.config";
import { DbDownloadFile, DbValueType, IDownloadFile } from "../../types/download";

class DownloadDbProvider extends BaseDbProvider {
  private static instance: DownloadDbProvider;

  public static getInstance(): DownloadDbProvider {
    if (!DownloadDbProvider.instance) {
      DownloadDbProvider.instance = new DownloadDbProvider();
    }
    return DownloadDbProvider.instance;
  }

  public tableName = DbConfig.downloadTableName;

  constructor() {
    super();
  }

  async createTable(db: SqliteDatabase) {
    try {
      const _tableSql = `
        CREATE TABLE IF NOT EXISTS ${DbConfig.downloadTableName}(
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          markId VARCHAR(255) NOT NULL,
          url VARCHAR(255) NOT NULL,
          icon VARCHAR(255),
          fileName VARCHAR(32),
          filePath VARCHAR(100) NOT NULL,
          status VARCHAR(32),
          receivedBytes INTEGER,
          totalBytes INTEGER,
          type INTEGER NOT NULL,
          createAt DATETIME DEFAULT(DATETIME('now','localtime'))
        )
      `;
      const _indexSql = `
        CREATE INDEX IF NOT EXISTS download_index ON ${DbConfig.downloadTableName}(markId, url)
      `;
      db.exec(_tableSql).exec(_indexSql);
    } catch (error) {
      console.log(error);
    }
  }

  getDownloadList(type = 0): DbDownloadFile[] {
    const db = this.getDatabase();
    const statement = db.prepare(`SELECT * FROM ${this.tableName} WHERE type = ${type}`);
    return this.all(statement) as DbDownloadFile[];
  }

  findOne(v: string | number, column: string): DbDownloadFile | undefined {
    const db = this.getDatabase();
    const statement = db.prepare(`SELECT * FROM ${this.tableName} WHERE ${column} = ?`);
    return this.get(statement, v) as DbDownloadFile | undefined;
  }

  insertOne(data: IDownloadFile) {
    const db = this.getDatabase();
    const { markId, url, icon, fileName, filePath, status, totalBytes, receivedBytes, type } = data;
    const sql = `INSERT INTO ${this.tableName} (markId, url, icon, fileName, filePath, status, totalBytes, receivedBytes, type)
    VALUES (@markId, @url, @icon, @fileName, @filePath, @status, @totalBytes, @receivedBytes, @type)`;
    const statement = db.prepare(sql);
    this.run(statement, {
      markId,
      url,
      icon,
      fileName,
      filePath,
      status,
      totalBytes,
      receivedBytes,
      type
    });
  }

  updateOne(values: DbValueType[], columns: string[], condition: string, conditionValue: string) {
    const db = this.getDatabase();
    const _colStr = columns.map((v) => `${v}=?`).join(",");
    const sql = `UPDATE ${this.tableName} SET
      ${_colStr} WHERE ${condition} = ?
    `;
    const _arg = [...values, conditionValue];
    const statement = db.prepare(sql);
    this.run(statement, ..._arg);
  }

  deleteOne(v: string | number, column: string) {
    const ret = this.findOne(v, column);
    if (!ret) return;
    const db = this.getDatabase();
    const sql = `
      DELETE FROM ${this.tableName} WHERE ${column} = ?
    `;
    const statement = db.prepare(sql);
    this.run(statement, v);
  }

  updateById(data: IDownloadFile, id: number) {
    const db = this.getDatabase();
    const { markId, url, icon, fileName, filePath, status, totalBytes, receivedBytes, type } = data;
    const sql = `UPDATE ${this.tableName} SET
      markId=@markId, url=@url, icon=@icon, fileName=@fileName, filePath=@filePath, status=@status,
      totalBytes=@totalBytes, receivedBytes=@receivedBytes, type=@type
      WHERE id = @id
    `;
    const statement = db.prepare(sql);
    this.run(statement, {
      markId,
      url,
      icon,
      fileName,
      filePath,
      status,
      totalBytes,
      receivedBytes,
      id,
      type
    });
  }

  deleteDone() {
    const db = this.getDatabase();
    const sql = `
      DELETE FROM ${this.tableName} WHERE status != 'running'
    `;
    const statement = db.prepare(sql);
    this.run(statement);
  }

  insertDownloadItem(item: IDownloadFile) {
    const ret = this.findOne(item.filePath, "filePath");
    if (ret) {
      this.updateById(item, ret.id);
    } else {
      this.insertOne(item);
    }
  }

  updateByList(items: IDownloadFile[]) {
    const _ids = this.getMarkIds();
    const db = this.getDatabase();
    const insertSql = `INSERT INTO ${this.tableName} (markId, url, icon, fileName, filePath, status, totalBytes, receivedBytes, type)
      VALUES (@markId, @url, @icon, @fileName, @filePath, @status, @totalBytes, @receivedBytes, @type)`;
    const updateSql = `UPDATE ${this.tableName} SET
      url=@url, icon=@icon, fileName=@fileName, filePath=@filePath, status=@status,
      totalBytes=@totalBytes, receivedBytes=@receivedBytes, type=@type
      WHERE markId = @markId
    `;
    const insertStatement = db.prepare(insertSql);
    const updateStatement = db.prepare(updateSql);
    try {
      db.transaction((items) => {
        for (const item of items) {
          const { markId, url, icon, fileName, filePath, status, totalBytes, receivedBytes, type } =
            item;
          if (_ids.includes(item.markId)) {
            updateStatement.run({
              url,
              icon,
              fileName,
              filePath,
              status,
              totalBytes,
              receivedBytes,
              markId,
              type
            });
          } else {
            insertStatement.run({
              markId,
              url,
              icon,
              fileName,
              filePath,
              status,
              totalBytes,
              receivedBytes,
              type
            });
          }
        }
      })(items);
    } finally {
      this.close();
    }
  }

  getMarkIds(): string[] {
    const db = this.getDatabase();
    const statement = db.prepare(`SELECT markId FROM ${this.tableName}`);
    return (this.all(statement) as { markId: string }[]).map((el) => el.markId);
  }
}

export default DownloadDbProvider;
