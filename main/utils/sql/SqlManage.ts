#!/usr/bin/env node
import { sqliteTool } from ".";
import {
  IQueryModulesResource,
  IQueryNodeAppOS,
  IQueryNodeConfig,
  IQueryNodeInfo,
  IResourceInfoItem,
  IResourceTreeItem
} from "./type";
import { NodeConfig, NodeResource, modulesResource, nodeApp, nodeOs } from "./DataBase";
import {
  IQueryParam,
  IQueryParamData,
  IQueryFuzzy,
  IQueryMax,
  IcheckString
} from "../../../types/sql";

// 公共方法
export class sqlManage {
  sqlite;
  constructor(dbPath: string) {
    this.sqlite = new sqliteTool(dbPath);
  }

  async all(str: string): Promise<unknown | null> {
    try {
      if (await this.sqlite.open()) {
        const res = await this.sqlite.all(str);
        return await this.handleSuccess("", "数据查询成功!", res);
      } else {
        return await this.openFailure("");
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  async run(str: string): Promise<unknown | null> {
    try {
      if (await this.sqlite.open()) {
        const res = await this.sqlite.run(str);
        return await this.handleSuccess("", "数据查询成功!", res);
      } else {
        return await this.openFailure("");
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 执行语句
  async runArr(arr: Array<string>): Promise<unknown | null> {
    try {
      if (await this.sqlite.open()) {
        for (let i = 0; i < arr.length; i++) {
          await this.sqlite.run(arr[i]);
        }

        return await this.handleSuccess("", "数据插入成功!", "ok");
      } else {
        return await this.openFailure("");
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  /**
   * 查询全部数据
   * @param dataname 数据库的名字
   * @param data  分页依据,默认不分页
   * @param lit 要查询的字段
   */
  async queryData(param: Array<unknown>): Promise<unknown | null> {
    const dataname = param[0] as string;

    const data = param[1]
      ? (param[1] as IQueryParam)
      : { pageSize: "", pageNum: "", order: 0, orderString: "" };

    const lit = param[2];

    let sql = "";

    if (data.pageNum === "" || data.pageSize === "") {
      try {
        const end = data.orderString
          ? `order by ${data.orderString ? data.orderString : ""} ${
              data.order === 0 ? "ASC" : "DESC"
            }`
          : "";
        sql = `select * from ${dataname} ${end}`;
        if (await this.sqlite.open()) {
          const result: unknown[] = await this.sqlite.all(sql);
          return await this.handleSuccess(dataname, "数据查询成功!", result);
        } else {
          return await this.openFailure(dataname);
        }
      } catch (e) {
        this.catchError(e);
        return null;
      }
    } else {
      try {
        const pageNum = data.pageNum;
        const pageSize = data.pageSize;

        const end = data.orderString
          ? `order by ${data.orderString ? data.orderString : ""} ${
              data.order === 0 ? "ASC" : "DESC"
            }`
          : "";

        sql = `select ${lit} from ${dataname} ${end} limit ${pageSize} offset ${
          (Number(pageNum) - 1) * Number(pageSize)
        }`;

        const sql2 = `select count(*) from ${dataname}`;

        if (await this.sqlite.open()) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const num: any = await this.sqlite.all(sql2);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result: any = await this.sqlite.all(sql);

          return await this.handleSuccess(dataname, "数据查询成功!", result, num[0]["count(*)"]);
        } else {
          return await this.openFailure(dataname);
        }
      } catch (e) {
        this.catchError(e);
        return null;
      }
    }
  }
  // 新增数据
  async addData(param: Array<unknown>): Promise<unknown | null> {
    const dataname = param[0] as string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = param[1] as any;
    try {
      let str = "";
      let str2 = "";
      for (const i in data) {
        str += "" + i + ",";
        str2 += "'" + data[i] + "',";
      }
      str = str.substring(0, str.lastIndexOf(",")) + "," + "del_flag";
      str2 = str2.substring(0, str2.lastIndexOf(",")) + "," + "1";

      if (await this.sqlite.open()) {
        const sql = `INSERT INTO ${dataname}(${str}) VALUES (${str2})`;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await this.sqlite.run(sql);

        return await this.handleSuccess(dataname, "数据新增成功!", result);
      } else {
        return await this.openFailure(dataname);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 编辑数据
  async editData(param: Array<unknown>): Promise<unknown | null> {
    const dataname = param[0] as string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = param[1] as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = param[2] as any;

    let str = "";
    let str2 = "";
    for (const i in data) {
      str += i + " =" + "'" + data[i] + "',";
    }
    for (const y in id) {
      str2 += "WHERE " + y + " =" + " '" + id[y] + "'";
    }
    str = str.substring(0, str.lastIndexOf(","));
    try {
      if (await this.sqlite.open()) {
        const sql = `update ${dataname} set ${str} ${str2}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await this.sqlite.run(sql);

        return await this.handleSuccess(dataname, "数据编辑成功!", result);
      } else {
        return await this.openFailure(dataname);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 删除数据
  async delData(param: Array<unknown>): Promise<unknown | null> {
    const dataname = param[0] as string;
    const data = param[1] as object;
    let str = "";
    for (const y in data) {
      str += "WHERE " + y + " =" + " '" + data[y] + "'";
    }
    try {
      if (await this.sqlite.open()) {
        const sql = `delete from ${dataname} ${str}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await this.sqlite.run(sql);

        return await this.handleSuccess(dataname, "数据删除成功!", result);
      } else {
        return await this.openFailure(dataname);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 精确查询数据
  async queryOneData(param: Array<unknown>): Promise<unknown | null> {
    const { dataName, idName, id } = param[0] as IQueryParamData;
    const newData = param[1];
    try {
      if (await this.sqlite.open()) {
        const sql = `select ${newData} from ${dataName} where ${idName} = ?`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await this.sqlite.all(sql, id);
        return await this.handleSuccess(dataName, "数据查询成功!", result);
      } else {
        return await this.openFailure(dataName);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 根据某个条件查询多个数据
  async queryTrueData(param: Array<unknown>): Promise<unknown | null> {
    const { dataName, idName, id } = param[0] as IQueryParamData;
    const isExited = param[1];
    try {
      if (await this.sqlite.open()) {
        const sql = `select * from ${dataName} where ${idName} = '${id}' ${
          isExited ? "" : "order by sortcode"
        }`;
        const result: unknown = await this.sqlite.all(sql);

        return await this.handleSuccess(dataName, "数据查询成功!", result);
      } else {
        return await this.openFailure(dataName);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 校验数据是否完整
  // async checkData(param: Array<unknown>): Promise<void> {
  //   const normData = param[0] as object;
  //   const data = param[1];
  //   const list = JSON.parse(JSON.stringify(data));

  //   for (const i in normData) {
  //     list[i] = list[i] || "";
  //   }
  //   return list;
  // }

  // 联表查询
  async findData(param: Array<unknown>): Promise<unknown | null> {
    const name1 = param[0];
    const name2 = param[1];
    const id = param[2];
    try {
      if (await this.sqlite.open()) {
        const sql = `select * from ${name1} inner join ${name2} on ${name1}.${id} = ${name2}.${id}`;
        const result: unknown = await this.sqlite.all(sql);

        return await this.handleSuccess(`${name1}和${name2}联表`, "数据查询成功!", result);
      } else {
        return await this.openFailure(`${name1} 和 ${name2} 联表查询`);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }
  // 查询数据库数据 跟现有数据进行对比，有的先删除再添加，没有的和剩下的删除
  async delAndEdit(data: Array<unknown>): Promise<unknown | null> {
    try {
      if (await this.sqlite.open()) {
        try {
          this.sqlite.db.serialize(() => {
            this.sqlite.db.run("begin transaction"); // 开启事务

            for (let i = 0; i < data.length; i++) {
              const item = data[i];
              this.sqlite.db.run(item);
            }

            this.sqlite.db.run("commit");
          });

          return await this.handleSuccess("数据操作", "数据操作成功!", "");
        } catch (err) {
          await this.sqlite.db.run("rollback"); // 放弃提交，回滚

          await this.sqlite.close();

          return {
            code: "1",
            message: "数据操作失败",
            res: ""
          };
        }
      } else {
        return await this.openFailure("数据操作失败");
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 查询表中符合某一个字段的所有参数
  async queryFuzzytype(param: Array<unknown>): Promise<unknown | null> {
    const dataName = param[0] as string;

    const data = param[1]
      ? (param[1] as IQueryParam)
      : {
          pageSize: "",
          pageNum: "",
          order: 0,
          orderString: "",
          type: "",
          typelist: ""
        };

    let sql = "";
    try {
      const pageNum = data.pageNum;
      const pageSize = data.pageSize;

      const end = data.orderString
        ? `order by ${data.orderString ? data.orderString : ""} ${
            data.order === 0 ? "ASC" : "DESC"
          }`
        : "";

      sql = `select * from ${dataName}  where ${data.type} in (${
        data.typelist
      }) ${end} limit ${pageSize} offset ${(Number(pageNum) - 1) * Number(pageSize)}`;

      const sql2 = `select count(*) from ${dataName} where ${data.type} in (${data.typelist})`;

      if (await this.sqlite.open()) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const num: any = await this.sqlite.all(sql2);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await this.sqlite.all(sql);

        return await this.handleSuccess(dataName, "数据查询成功!", result, num[0]["count(*)"]);
      } else {
        return await this.openFailure(dataName);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 模糊查询
  async queryFuzzy(param: Array<unknown>): Promise<unknown | null> {
    const data = param[0];
    const newData = param[1] as Array<unknown>;
    let str = "";
    const { dataName, system_id, pageSize = 15, pageNum = 1, value } = data as IQueryFuzzy;

    for (const y in newData) {
      if (Number(y) + Number(1) == newData.length) {
        str += `${newData[y]} like '%${value}%'`;
      } else {
        str += `${newData[y]} like '%${value}%' or `;
      }
    }
    try {
      if (await this.sqlite.open()) {
        // 如果data中有system_id，则查询系统表
        const end = system_id
          ? ` and system_id = '${system_id}' order by sortcode limit ${pageSize} offset ${
              (pageNum - 1) * pageSize
            }`
          : ` order by sortcode limit ${pageSize} offset ${(pageNum - 1) * pageSize}`;

        const sql = `select ${newData} from ${dataName} where ` + str + end;
        const result: unknown = await this.sqlite.all(sql);

        return await this.handleSuccess(dataName, "数据查询成功!", result);
      } else {
        return await this.openFailure(dataName);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 查询某一列最大的值
  async queryMax(data: IQueryMax): Promise<unknown | null> {
    const { str, dataName } = data;
    try {
      if (await this.sqlite.open()) {
        const sql = `select MAX(${str}) from ${dataName}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await this.sqlite.all(sql);

        if (str == "sortcode" && result["MAX(sortcode)"] == null) {
          result["MAX(sortcode)"] = "000";
        }

        return await this.handleSuccess(dataName, `${str}最大值查询成功!`, result);
      } else {
        return await this.openFailure(dataName);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 校验字典字段的唯一性
  /**
   *
   * @param data {dataName："数据库名称",dataString："被校验的字段"，value：'值'}
   */
  async checkString(data: IcheckString): Promise<unknown | null> {
    const { dataName, dataString, value } = data;
    try {
      if (await this.sqlite.open()) {
        const sql = `select count(*) from ${dataName} where ${dataString} = '${value}'`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await this.sqlite.all(sql);

        return await this.handleSuccess(dataName, `${dataString}数据校验查询成功!`, result); // result[0]["count(*)"]
      } else {
        return await this.openFailure(dataName);
      }
    } catch (e) {
      this.catchError(e);
      return null;
    }
  }

  // 查询全部数据 带参数
  async queryChooseData(param: Array<unknown>): Promise<unknown | null> {
    const dataName = param[0] as string;

    const data = param[1]
      ? (param[1] as IQueryParam)
      : { pageSize: "", pageNum: "", order: 0, orderString: "" };

    const lit = param[2];
    const msg = param[3] as IQueryParamData;
    let sql = "";
    if (data.pageNum === "" || data.pageSize === "") {
      try {
        if (data.orderString == "" || data.orderString == undefined) {
          sql = `select ${lit} from ${dataName} where ${msg.idName} = "${msg.id}"`;
        } else {
          sql = `select ${lit} from ${dataName} where ${msg.idName} = "${msg.id}" order by ${
            data.orderString
          } ${data.order === 0 ? "ASC" : "DESC"} `;
        }
        if (await this.sqlite.open()) {
          const result: unknown = await this.sqlite.all(sql);

          return await this.handleSuccess(dataName, "数据查询成功!", result);
        } else {
          return await this.openFailure(dataName);
        }
      } catch (e) {
        this.catchError(e);
        return null;
      }
    } else {
      try {
        const pageNum = data.pageNum;
        const pageSize = data.pageSize;

        if (data.orderString == "" || data.orderString == undefined) {
          sql = `select ${lit} from ${dataName} where ${msg.idName} =" ${
            msg.id
          }"    limit ${pageSize} offset ${(Number(pageNum) - 1) * Number(pageSize)}`;
        } else {
          sql = `select ${lit} from ${dataName} where ${msg.idName} =  "${msg.id}"     order by ${
            data.orderString
          } ${data.order === 0 ? "ASC" : "DESC"}  limit ${pageSize} offset ${
            (Number(pageNum) - 1) * Number(pageSize)
          }`;
        }

        const sql2 = `select count(*) from ${dataName} where ${msg.idName} = "${msg.id}" `;

        if (await this.sqlite.open()) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const num: any = await this.sqlite.all(sql2);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result: any = await this.sqlite.all(sql);

          return await this.handleSuccess(dataName, "数据查询成功!", result, num[0]["count(*)"]);
        } else {
          return await this.openFailure(dataName);
        }
      } catch (e) {
        this.catchError(e);
        return null;
      }
    }
  }

  /**
   * 打开数据库失败提示
   * @param _dataname
   * @returns
   */
  async openFailure(_dataname: string): Promise<object> {
    await this.sqlite.close();
    const tips = "数据库连接失败,数据查询失败";
    return {
      code: "1",
      tableName: _dataname,
      message: tips,
      res: []
    };
  }

  /**
   * sql成功提示
   * @param dataname
   * @param msg
   * @param result
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleSuccess(_dataname: string, msg: string, result: any, sum = 0): Promise<object> {
    await this.sqlite.close();
    return {
      code: "0",
      tableName: _dataname,
      message: msg,
      res: result,
      sum
    };
  }

  /**
   * 抛出错误
   * @param e
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async catchError(e: any): Promise<void> {
    throw e;
  }
  // 查询资源树
  async transformResourceTree(
    arr: Array<IResourceTreeItem>
  ): Promise<Array<IResourceInfoItem> | null> {
    try {
      const nodeArr = arr.filter((e) => e.res_type === "0");
      const moduleArr = arr.filter((e) => e.res_type === "1");
      const appArr = arr.filter((e) => e.res_type === "3");
      const OSArr = arr.filter((e) => e.res_type === "4");
      const configArr = arr.filter((e) => e.res_type === "5");
      const result = [] as Array<IResourceInfoItem>;
      for (let i = 0; i < nodeArr.length; i++) {
        const nodeItem = nodeArr[i];
        const param = {
          dataName: NodeResource.tableName,
          idName: "node_id",
          id: nodeItem.res_property_id
        };
        const nodeInfo: IQueryNodeInfo = (await this.queryOneData([
          param,
          NodeResource.filedNames
        ])) as IQueryNodeInfo;

        const item: IResourceInfoItem = {
          res_id: nodeItem.res_id,
          res_name: nodeItem.res_name,
          res_type: nodeItem.res_type,
          res_uri: nodeItem.res_uri,
          node_alias: nodeInfo.res[0].node_alias || "",
          node_desc: nodeInfo.res[0].node_desc,
          node_model: nodeInfo.res[0].node_model,
          node_code: nodeInfo.res[0]?.node_code || "",
          sortcode: nodeItem.sortcode || "",
          res_property_id: nodeItem.res_property_id,
          img_path: "",
          programs: [],
          config_libary: []
        };

        // 节点下的模组
        const childModule = moduleArr.filter((m) => nodeItem.res_double_ref.includes(m.res_id));

        for (let j = 0; j < childModule.length; j++) {
          const moduleItem = childModule[j];

          const param = {
            dataName: modulesResource.tableName,
            idName: "module_id",
            id: moduleItem.res_property_id
          };
          const res: IQueryModulesResource = (await this.queryOneData([
            param,
            modulesResource.filedNames
          ])) as IQueryModulesResource;
          // console.log("modulesResource.filedNames", res);

          moduleItem["maintain_type"] = res ? res.res[0].code : "1";

          // 模组下的OS
          await this.handleProgram(OSArr, moduleItem, item, "getOsCode");

          // 模组下的APP
          await this.handleProgram(appArr, moduleItem, item, "getAppCode");

          // 模组下的配置
          const childConfig = configArr.filter((c) => moduleItem.res_double_ref.includes(c.res_id));

          for (let n = 0; n < childConfig.length; n++) {
            const unit = childConfig[n];

            const param = {
              dataName: NodeConfig.tableName,
              idName: "config_id",
              id: unit.res_property_id
            };
            const cfg: IQueryNodeConfig = (await this.queryOneData([
              param,
              NodeConfig.filedNames
            ])) as IQueryNodeConfig;
            // console.log("cfg ==== NodeConfig.filedNames", cfg);

            const find = item.config_libary.some(
              (c3) => c3.res_property_id === unit.res_property_id
            );
            if (find) continue;

            item.config_libary.push({
              checked: false,
              res_id: unit.res_id,
              res_name: unit.res_name.split("_")[1], // 例如：ZE0705_自动工艺配置  为了界面显示和文件名称校验，去掉前缀
              res_type: unit.res_type,
              res_uri: unit.res_uri,
              res_property_id: unit.res_property_id,
              res_desc: unit.res_desc || unit.os_desc || "",
              config_alias: cfg?.res[0].config_alias,
              maintain_type: cfg.res[0].config_key,
              sortcode: unit.sortcode || "",
              file: null,
              fileName: "",
              version: "",
              md5: ""
            });
          }
        }

        result.push(item);
      }

      return result;
    } catch (error) {
      return null;
    }
  }
  //查询程序码
  async handleProgram(
    arr: Array<IResourceTreeItem>,
    moduleItem: IResourceTreeItem,
    item: IResourceInfoItem,
    key: string
  ): Promise<void> {
    const children = arr.filter((p) => moduleItem.res_double_ref.includes(p.res_id));
    for (let k = 0; k < children.length; k++) {
      const unit = children[k];
      const find = item.programs.some((c3) => c3.res_property_id === unit.res_property_id);
      if (find) continue;

      const param = {
        dataName: key === "getOsCode" ? nodeOs.tableName : nodeApp.tableName,
        idName: key === "getOsCode" ? "os_id" : "app_id",
        id: unit.res_property_id
      };
      const filedNames = key === "getOsCode" ? nodeOs.filedNames : nodeApp.filedNames;
      const res: IQueryNodeAppOS = (await this.queryOneData([
        param,
        filedNames
      ])) as IQueryNodeAppOS;
      // console.log("res === getOsCode", res);

      const maintainType = res ? res.res[0].code : "1";

      item.programs.push({
        checked: false,
        res_id: unit.res_id,
        res_name: unit.res_name.split("_")[1], // 例如：ZE0705_自动工艺配置  为了界面显示和文件名称校验，去掉前缀
        res_type: unit.res_type,
        res_uri: unit.res_uri,
        res_property_id: unit.res_property_id,
        res_desc: unit.res_desc || "",
        maintain_type: maintainType, // app的code
        device_type: moduleItem.maintain_type, // 所属模组的 maintain_type
        sortcode: unit.sortcode || "",
        version: "",
        fileName: "",
        file: {
          raw: null,
          size: 0
        },
        md5: ""
      });
    }
  }
}
