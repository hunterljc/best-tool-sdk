#!/usr/bin/env node
import Database from "better-sqlite3";
// const Database = require("better-sqlite3").verbose()

export class sqliteTool {
  public db;
  status = false;
  url = "";

  constructor(dbPath: string) {
    this.url = dbPath;
    this.db = new Database(this.url, {
      // verbose: console.log //打印错误信息
    });
  }

  // 连接数据库
  async open(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.db.open) {
          this.db = new Database(this.url, {
            // verbose: console.log
          });
        }
        resolve(this.db);
      } catch (error) {
        reject(error);
      }
    });
  }
  // 执行单条查询语句
  async run(query: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const statement = this.db.prepare(query);
        const result = statement.run();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 查询多个执行语句
  async all(query: string, params = ""): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const statement = this.db.prepare(query);
        const result = params ? statement.all(params) : statement.all();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async close(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        // if (!this.db.open) return
        this.db.close();
        if (!this.db.open) {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
