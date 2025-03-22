export interface CryptoIpc {
  zmjEncryption: (json: string) => Promise<string>;
  zmjDecryption: (json: string) => Promise<object>;
  zmjDecryptionXml: (json: string) => Promise<string>;
  readFileDecryptionProject: (filePath: string) => Promise<unknown>;
  writeFileEncryptionProject: (filePath: string, raw: string) => void;
  publicDecrypt: (publicKey: any, passphrase: any, encryptBuffer: any) => Promise<object>;
}
