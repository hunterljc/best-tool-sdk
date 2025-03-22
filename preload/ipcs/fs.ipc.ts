import { ipcRenderer } from "electron";
import { FsIpc } from "../ipc_types/fsIpc.type";
import { apiEvent } from "../../../main/config/constants";

const fsIpc: FsIpc = {
  readFileSync: (src: string) => ipcRenderer.invoke(apiEvent.fs, "readFileSync", src),
  readFileBufferSync: (src: string) => ipcRenderer.invoke(apiEvent.fs, "readFileBufferSync", src),
  writeFileSync: (src: string, raw: string) =>
    ipcRenderer.send(apiEvent.fsOn, "writeFileSync", src, raw),
  readdirSync: (src: string) => ipcRenderer.invoke(apiEvent.fs, "readdirSync", src),
  readFileAbsBuff: (filepath: string) =>
    ipcRenderer.invoke(apiEvent.fs, "readFileAbsBuff", filepath),
  copyFileSync: (src: string, dest: string) =>
    ipcRenderer.send(apiEvent.fsOn, "copyFileSync", src, dest),
  copyFileStream: (src: string, dest: string) =>
    ipcRenderer.send(apiEvent.fsOn, "copyFileStream", src, dest),
  ensureFile: (src: string) => ipcRenderer.send(apiEvent.fsOn, "ensureFile", src),
  ensureDirSync: (src: string) => ipcRenderer.send(apiEvent.fsOn, "ensureDirSync", src),
  existsSync: (src: string) => ipcRenderer.invoke(apiEvent.fs, "existsSync", src),
  removeSync: (src: string) => ipcRenderer.send(apiEvent.fsOn, "removeSync", src),
  compressFile: (src: string, dist: string) =>
    ipcRenderer.invoke(apiEvent.fs, "compressFile", src, dist),
  compressFiles: (src: string, dist: string) =>
    ipcRenderer.invoke(apiEvent.fs, "compressFiles", src, dist),
  compressArchiver: (src: string, dist: string) =>
    ipcRenderer.invoke(apiEvent.fs, "compressArchiver", src, dist),
  uncompressFile: (src: string, dist: string) =>
    ipcRenderer.invoke(apiEvent.fs, "uncompressFile", src, dist),
  readBolbFile: async (filePath: string, fileName: string) => {
    const fileData = await ipcRenderer.invoke(apiEvent.fs, "readFileBufferSync", filePath);
    const raw = new File([new Blob([fileData])], fileName, {
      type: "application/octet-stream"
    }) as any;
    return raw;
  },
  readBolbByStream: async (filePath: string, fileName: string) => {
    const fileData = await ipcRenderer.invoke(apiEvent.fs, "readFileAbsBuff", filePath);
    const raw = new File([new Blob([fileData])], fileName, {
      type: "application/octet-stream"
    }) as any;
    return raw;
  },
  jsonToRaw: async (fileData: string, fileName: string) => {
    const raw = new File([new Blob([fileData])], fileName, {
      type: "application/octet-stream"
    }) as any;
    return raw;
  },
  renameSync: (oldPath: string, newPath: string) =>
    ipcRenderer.send(apiEvent.fsOn, "renameSync", oldPath, newPath),
  readFileSize: (filepath: string) => ipcRenderer.invoke(apiEvent.fs, "readFileSize", filepath),
  isDirectory: (src: string) => ipcRenderer.invoke(apiEvent.fs, "isDirectory", src)
};

export default fsIpc;
