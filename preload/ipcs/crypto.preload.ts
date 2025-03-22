import { ipcRenderer } from "electron";
import { CryptoIpc } from "../ipc_types/cryptoIpc.type";
import { apiEvent } from "../../../main/config/constants";

const cryptoIpc: CryptoIpc = {
  zmjEncryption: (json: string): Promise<string> =>
    ipcRenderer.invoke(apiEvent.crypto, "zmjEncryption", json),
  zmjDecryption: (json: string): Promise<object> =>
    ipcRenderer.invoke(apiEvent.crypto, "zmjDecryption", json),
  zmjDecryptionXml: (json: string): Promise<string> =>
    ipcRenderer.invoke(apiEvent.crypto, "zmjDecryptionXml", json),
  readFileDecryptionProject: (filePath: string): Promise<unknown> =>
    ipcRenderer.invoke(apiEvent.crypto, "readFileDecryptionProject", filePath),
  writeFileEncryptionProject: (filePath: string, raw: string): void =>
    ipcRenderer.send(apiEvent.cryptoOn, "writeFileEncryptionProject", filePath, raw),
  publicDecrypt: (publicKey: any, passphrase: any, encryptBuffer: any): Promise<object> =>
    ipcRenderer.invoke(apiEvent.crypto, "publicDecrypt", publicKey, passphrase, encryptBuffer)
};

export default cryptoIpc;
