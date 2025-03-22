import fs from "fs-extra";
import path from "path";
class fsUtil {
  // 同步读取文件信息
  public static readFileSync = (src: string): string | undefined => {
    if (fs.existsSync(src)) {
      return fs.readFileSync(src, "utf8");
    } else {
      return undefined;
    }
  };
  // 同步读取文件buffer信息
  public static readFileBufferSync = (src: string): Buffer | undefined => {
    if (fs.existsSync(src)) {
      return fs.readFileSync(src);
    } else {
      return undefined;
    }
  };
  /**
   * 同步向文件写入内容
   * @param filename 文件名
   * @param raw 文件信息：json
   * @param folder 文件夹名称
   */
  public static writeFileSync = (src: string, raw: string): void => {
    const error: any = fs.writeFileSync(src, raw, "utf8");
    if (error) {
      console.log(error);
    }
  };

  /**
   * 读取文件列表
   * @param filename
   */
  public static readdirSync = (src: string): Array<string> => {
    if (fs.existsSync(src)) {
      const data = fs.readdirSync(src, "utf8");
      return data;
    } else {
      return [];
    }
  };

  /**
   * 将文件读取为可读流
   * @param filePath
   * @returns
   */
  public static readFileAbsBuff = (filePath: string) => {
    return new Promise((resolve, reject) => {
      try {
        // fs读取整个文件流
        const stats = fs.statSync(filePath);

        // 文件的总大小
        const size = stats.size;

        const readStream = fs.createReadStream(filePath, {
          start: 0,
          end: size
        });

        // on data读取数据
        const arr: any[] = [];
        readStream.on("data", (_data) => {
          arr.push(_data);
        });

        readStream.on("end", () => {
          resolve(Buffer.concat(arr));
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * 将一个文件夹下全部文件拷贝到另一个文件夹下（自动创建没有的文件夹）
   * @param src 要复制的源文件夹
   * @param dest 复制操作的目标文件夹
   */
  public static copyFileSync = (src: string, dest: string): void => {
    try {
      // 拷贝文件
      fs.copySync(src, dest);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 通过流的方式拷贝文件
   * @param src 原文件绝对路径
   * @param dest 拷贝目标绝对路径
   */
  public static copyFileStream = (src: string, dest: string): void => {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
  };

  /**
   * 根据路径创建文件（支持多层）
   * @param src
   */
  public static ensureFile = (src: string): void => {
    fs.ensureFile(src);
  };
  /**
   * 根据路径创建文件夹（支持多层）
   * @param src
   */
  public static ensureDirSync = (src: string): void => {
    fs.ensureDirSync(src);
  };

  /**
   *  判断指定路径下文件是否存在
   * @param src
   * @return boolean
   */
  public static existsSync = (src: string): boolean => {
    return fs.existsSync(src);
  };

  /**
   *  同步删除文件或文件夹（包含内部所有内容）
   * @param src 绝对路径
   */
  public static removeSync = (src: string): void => {
    if (fs.existsSync(src)) {
      fs.removeSync(src);
    }
  };

  /**
   * 重命名文件夹
   * @param oldPath
   * @param newPath
   */
  public static renameSync = (oldPath: string, newPath: string) => {
    fs.renameSync(oldPath, newPath);
  };

  // 读取文件大小
  public static readFileSize = (filepath: string) => {
    if (fs.existsSync(filepath)) {
      // fs读取整个文件流
      const stats = fs.statSync(filepath);
      // 文件的总大小
      return stats.size;
    } else {
      return 1;
    }
  };

  /**
   *  压缩文件夹 ==> 到一个.zip
   * @param filePath 源路径
   * @param distPath 目标名称
   */
  public static compressFile = async (filePath: string, distPath: string) => {
    const compressing = require("compressing");
    try {
      await compressing.zip.compressDir(filePath, distPath);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 解压文件
   * @param filePath 待解压文件路径 XXX.zip
   * @param savePath 输出路径
   */
  public static uncompressFile = async (filePath: string, distPath: string): Promise<boolean> => {
    // 1.解压文件： 不加GBK,下载后中文乱码。  加上GBK只能解决zip内首层乱码， 不能解决子文件夹内中文乱码
    const compressing = require("compressing");
    try {
      await compressing.zip.uncompress(filePath, distPath, { zipFileNameEncoding: "UTF-8" });
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * 压缩多文件 ==> 到一个.zip
   * @param filePath 源路径
   * @param distPath 目标名称
   */
  public static compressFiles = async (filePath: string, distPath: string) => {
    const compressing = require("compressing");
    return new Promise((resolve, reject) => {
      try {
        const addr = fs.readdirSync(filePath);
        const tarStream = new compressing.zip.Stream();
        for (let i = 0; i < addr.length; i++) {
          const el = addr[i];
          tarStream.addEntry(path.join(filePath, el));
        }
        tarStream
          .on("error", (error1) => {
            console.log("error1==", error1);
            reject(false);
          })
          .pipe(fs.createWriteStream(distPath))
          .on("finish", (msg: string) => {
            if (!msg) {
              resolve(true);
            } else {
              reject(false);
            }
          });
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  };

  public static compressArchiver = async (filePath: string, distPath: string) => {
    return new Promise((resolve, reject) => {
      try {
        const archiver = require("archiver");
        const output = fs.createWriteStream(distPath);
        // zip级别
        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(output);

        // 添加文件夹
        archive.directory(filePath, "");
        // archive.directory(`${dist}/var`, `${newDir}/var`);
        //直接添加文件,'./plugin.json'由脚本生成
        // archive.file("./README.md", { name: `${pluginName}/README.md` });

        archive
          .finalize()
          .then(() => {
            console.log(`compresszip creat success！`);
            resolve(true);
          })
          .catch((err) => {
            resolve(false);
          });
      } catch (error) {
        reject(false);
      }
    });
  };

  public static isDirectory = async (path: string): Promise<boolean> => {
    const stats = fs.statSync(path);
    return stats.isDirectory();
  };
}

export default fsUtil;
