import type http from "http";

export interface INewFileForm {
  url: string;
  fileName?: string;
  path: string;
  type: number;
  winUrl: string;
}

export type DownloadItemStatus = "running" | "pause" | "completed" | "error";

export interface IDownloadFile {
  id?: number;
  markId: string;
  url: string;
  icon: string;
  fileName: string;
  filePath: string;
  status: DownloadItemStatus;
  speed: number;
  progress: number;
  totalBytes: number;
  receivedBytes: number;
  type: number;
  requestClient?: http.ClientRequest;
}

export interface IDownloadBytes {
  receivedBytes: number;
  totalBytes: number;
}

export interface DbExtend {
  id: number;
  createAt: string;
}

export type DbDownloadFile = Omit<
  IDownloadFile,
  "requestClient" | "speed" | "progress" | "paused"
> &
  DbExtend;

export type DbValueType = string | number;

export type StatementParamType = unknown[];
