import Database from "better-sqlite3";
import path from "path";
import { SqliteDatabase } from "../../types/common";
import DownloadDbProvider from "./download.db";

class SqlManager {
  private static instance: SqlManager;

  public static getInstance(): SqlManager {
    if (!SqlManager.instance) {
      SqlManager.instance = new SqlManager();
      SqlManager.instance.init();
    }
    return SqlManager.instance;
  }

  private dbName = "plugins-hd.db";

  private db: SqliteDatabase | undefined;

  init() {
    const _path = path.join(process.cwd(), "resources", this.dbName);

    this.db = new Database(_path, {
      // verbose: console.log
    });

    this.initTables();
  }

  initTables() {
    DownloadDbProvider.getInstance();
  }

  getDatabase(): Database.Database {
    if (!this.db || !this.db.open) {
      this.init();
    }
    return this.db!;
  }

  close() {
    if (this.db === undefined || !this.db.open) return;
    this.db.close();
    this.db = undefined;
  }
}

export default SqlManager;
