import crypto from "crypto";
import fs from "fs-extra";

class CryptoUtil {
  private static KEY = crypto.scryptSync("zmj1234567890", "zmos", 32);
  private static IV = Buffer.alloc(16, 6);

  // 加密
  public static zmjEncryption(json: string): string {
    const cipher = crypto.createCipheriv("aes-256-cbc", CryptoUtil.KEY, CryptoUtil.IV);
    let encrypted = cipher.update(json);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const result = encrypted.toString("hex");
    return result;
  }

  // 解密JSON
  public static zmjDecryption(json: string): object {
    const encryptedText = Buffer.from(json, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(CryptoUtil.KEY),
      CryptoUtil.IV
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const result = JSON.parse(decrypted.toString());
    return result;
  }
  // 解密Xml
  public static zmjDecryptionXml(json: string): string {
    const encryptedText = Buffer.from(json, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(CryptoUtil.KEY),
      CryptoUtil.IV
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  /**
   *  通用——读取解密文件
   * @param filePath 绝对路径
   * @returns
   */
  public static readFileDecryptionProject = (filePath: string): unknown => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      if (filePath.includes(".xml")) {
        return content ? CryptoUtil.zmjDecryptionXml(content) : {};
      } else {
        return content ? CryptoUtil.zmjDecryption(content) : {};
      }
    } else {
      return;
    }
  };

  /**
   *   通用——写入解密文件
   * @param filePath 绝对路径
   * @param raw json
   * @returns
   */
  public static writeFileEncryptionProject = (filePath: string, raw: string): void => {
    const json = raw ? CryptoUtil.zmjEncryption(raw) : "";
    fs.writeFileSync(filePath, json, "utf8");
  };

  // 登录模块专用--使用公钥解密数据
  public static publicDecrypt = (publicKey: any, passphrase: any, encryptBuffer: any): object => {
    const msgBuffer = crypto.publicDecrypt(
      {
        key: publicKey,
        passphrase,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      Buffer.from(encryptBuffer)
    );

    return JSON.parse(msgBuffer.toString("utf8"));
  };
}

export default CryptoUtil;
