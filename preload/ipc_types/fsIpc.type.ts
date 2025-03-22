export interface FsIpc {
  readFileSync: (src: string) => Promise<any>;
  readFileBufferSync: (src: string) => Promise<Buffer>;
  writeFileSync: (src: string, raw: string) => void;
  readdirSync: (src: string) => Promise<any>;
  readFileAbsBuff: (filepath: string) => Promise<any>;
  copyFileSync: (src: string, dest: string) => void;
  copyFileStream: (src: string, dest: string) => void;
  ensureFile: (src: string) => void;
  ensureDirSync: (src: string) => void;
  existsSync: (src: string) => Promise<boolean>;
  removeSync: (src: string) => void;
  compressFile: (src: string, dist: string) => Promise<any>;
  compressFiles: (src: string, dist: string) => Promise<any>;
  compressArchiver: (src: string, dist: string) => Promise<any>;
  uncompressFile: (src: string, dist: string) => Promise<any>;
  readBolbFile: (filePath: string, fileName: string) => Promise<any>;
  readBolbByStream: (filePath: string, fileName: string) => Promise<any>;
  jsonToRaw: (fileData: string, fileName: string) => Promise<any>;
  renameSync: (oldPath: string, newPath: string) => void;
  readFileSize: (filepath: string) => Promise<any>;
  isDirectory: (src: string) => Promise<any>;
}
