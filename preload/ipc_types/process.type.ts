export interface IProcessIpc {
  openDir: (url: string) => void;
  startAPP: (programPath: string) => void;
  closeAPP: () => void;
}
