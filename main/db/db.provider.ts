import BetterSqlite3, { Statement } from "better-sqlite3";
import type BetterSqlite3T from "better-sqlite3";
import SqlManager from "./sql.manager";
import { StatementParamType } from "../../types/download";

type SqliteDatabase = BetterSqlite3T.Database;

abstract class BaseDbProvider {
  abstract tableName: string;

  abstract createTable(db: SqliteDatabase): void;

  constructor() {
    const _database = this.getDatabase();
    this.initial(_database);
  }

  initial(database: SqliteDatabase) {
    try {
      this.createTable(database);
    } finally {
      this.close();
    }
  }

  getDatabase(): SqliteDatabase {
    return SqlManager.getInstance().getDatabase();
  }

  run(statement: Statement, ...arg: StatementParamType): BetterSqlite3.RunResult {
    try {
      return statement.run(...arg);
    } finally {
      this.close();
    }
  }

  all(statement: Statement) {
    try {
      return statement.all();
    } finally {
      this.close();
    }
  }

  get(statement: Statement, ...arg: StatementParamType) {
    try {
      return statement.get(...arg);
    } finally {
      this.close();
    }
  }

  close() {
    const db = this.getDatabase();
    if (!db.open) return;
    db.close();
  }

  drop() {
    const db = this.getDatabase();
    db.exec(`DROP TABLE ${this.tableName}`);
    this.close();
  }
}

export default BaseDbProvider;
