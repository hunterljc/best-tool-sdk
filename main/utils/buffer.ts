class bufferUtil {
  // 同步读取文件信息
  public static alloc(num: number): Buffer {
    return Buffer.alloc(num);
  }
  public static concat(arr: any[], size: number): Buffer {
    return Buffer.concat(arr, size);
  }
  public static from(num: ArrayBufferLike): Buffer {
    return Buffer.from(num);
  }
}

export default bufferUtil;
