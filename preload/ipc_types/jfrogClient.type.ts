// 设备发现
export interface IjfrogClient {
  ping: (src:Array<string>) => Promise<boolean>;
  download: (src:Array<string>) => Promise<boolean>;
}
