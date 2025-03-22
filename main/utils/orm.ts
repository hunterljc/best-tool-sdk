// const typeorm = require("typeorm");
import * as typeorm from "typeorm";

const orm = {
  typeorm: typeorm,
  getTableNamesByDB: async (file_path) => {
    const connection = await getDBConnection(file_path);
    const qr = await connection.createQueryRunner();
    await qr.connect();
    const res = await qr.getTables();
    await qr.release();
    await connection.close();
    return res;
  },
  // 查询表所有数据
  getContentByTableAndFile: async (file_path, table) => {
    const connection = await getDBConnection(file_path);
    const qr = await connection.createQueryRunner();
    await qr.connect();
    const res = await qr.query(`select *
                                from ${table}`);
    await qr.release();
    await connection.close();
    return res;
  },
  // 查询表所有数据
  getContentBySqlAndFile: async (file_path, sql) => {
    const connection = await getDBConnection(file_path);
    const qr = await connection.createQueryRunner();
    await qr.connect();
    const res = await qr.query(`${sql}`);
    await qr.release();
    await connection.close();
    return res;
  },
  // 根据参数查询
  getContentBySqlAndParam: async (file_path: string, sql: string, parameters?: any[]) => {
    const connection = await getDBConnection(file_path);
    const qr = await connection.createQueryRunner();
    await qr.connect();
    const res = await qr.query(`${sql}`, parameters);
    await qr.release();
    await connection.close();
    return res !== undefined ? res : { count: 1 };
  },
  // 关闭连接
  closeDefaultConnection: async () => {
    const defaultConnection = await typeorm.getConnection("default");
    if (defaultConnection && defaultConnection.isConnected) {
      defaultConnection.close();
    }
  }
};
export default orm;

// 连接数据库
const getDBConnection = async (file_path) => {
  const connection = await typeorm.createConnection({
    type: "sqlite",
    database: file_path,
    logging: true
  });
  return connection;
};
