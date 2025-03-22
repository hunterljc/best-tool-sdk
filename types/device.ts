// coap 设备发现
/**
 * scu_no         支架号
 * scu_ip         ip
 * reset_state    重启状态:    0隐藏， 1 等待重启， 2重启成功  3 重启失败
 * process:       进度         空，维护失败， 0: 等待， 20进度值，100维护成功，
 * child_process: 子程序进度
 * process_desc： 进度描述
 */
export interface coapItem {
  type: string;
  name: string;
  scu_no: string;
  scu_ip: string;
  scu_mac: string;
  system_version: string;
  system_name: string;
  system_state: string;
  product_time: string;
  hold_version: string;
  app_version: string;
  reset_state: number;
  process: number; // 进度
  complete: number; // 进度完成情况 -1 失败， 0 准备， 1 成功
  child_process: number; // 进度
  process_desc: string; // 进度描述
  selected: boolean; // 是否选中
  handle: number; // 中断传程参数
  level: number; // 层级
  children: IMartainItemChild[];
  un: boolean; // 异常编号
}

// 准备维护的设备
export interface IMartainItem extends coapItem {
  id: string;
}
export interface IMartainItemChild {
  scu_no: string;
  scu_ip: string;
  id: string;
  level: number;
  process: number;
  complete: number;
  process_desc: string;
  child_process: number;
  reset_state: number;
  selected: boolean;
}

export type UploadFiles = UploadFile[];

export type UploadUserFile = Omit<UploadFile, "status" | "uid"> &
  Partial<Pick<UploadFile, "status" | "uid">>;

export type UploadStatus = "ready" | "uploading" | "success" | "fail";

export interface UploadFile {
  name: string;
  percentage?: number;
  status: UploadStatus;
  size?: number;
  response?: unknown;
  uid: number;
  url?: string;
  raw?: UploadRawFile;
}

export interface UploadProgressEvent extends ProgressEvent {
  percent: number;
}

export interface UploadRawFile extends File {
  uid: number;
}

export interface Ifile {
  raw: Buffer;
  size: number;
}
