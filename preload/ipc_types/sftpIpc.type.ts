export interface SftpIpc {
  init: (host: string, port: number, username: string, password: string) => Promise<any[]>;
  activeNode: (name: string) => Promise<any[]>;
  download: (downloadPath: string, pathName: string) => Promise<boolean>;
  deleteFile: (remoteFilePath: string) => Promise<boolean>;
  initLocal: () => Promise<any[]>;
  setDirtoType: (pathName: string) => Promise<any>;
  upload: (localPath: string, remotePath: string) => Promise<boolean>;
}
