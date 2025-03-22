// 设备发现
export interface IscpClient {
  init: (src: Object) => Promise<boolean>;
  close: (src: Array<string>) => Promise<boolean>;
  exists: (src: Array<string>) => Promise<boolean>;
  list: (src: Array<string>) => Promise<boolean>;
  uploadFile: (src: Array<string>) => Promise<boolean>;
  uploadDir: (src: Array<string>) => Promise<boolean>;
  mkdir: (src: Array<string>) => Promise<boolean>;
  downloadFile: (src: Array<string>) => Promise<boolean>;
  downloadDir: (src: Array<string>) => Promise<boolean>;
  unlink: (src: Array<string>) => Promise<boolean>;
  rmdir: (src: Array<string>) => Promise<boolean>;
}
