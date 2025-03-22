export interface BufferIpc {
  alloc: (num: number) => any;
  concat: (arr: [], size: number) => any;
  from: (str: string) => any;
}
