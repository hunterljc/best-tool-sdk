export interface ILog {
  setLogPathL: (basePath: string) => () => string;
  error: (info: string) => void;
  warn: (info: string) => void;
  info: (info: string) => void;
  verbose: (info: string) => void;
  debug: (info: string) => void;
}
