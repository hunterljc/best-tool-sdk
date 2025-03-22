export const apiEvent = {
  system: "api-system",
  systemOn: "api-system-on",
  windowOn: "api-window-on",
  dialog: "api-ddialog",
  dialogOn: "api-ddialog-on",
  download: "api-download",
  downloadOn: "api-db-on",
  listenNew: "listen-new-download",
  listenUpdate: "listen-update-download",
  listenDone: "listen-done-donwload",
  crypto: "api-crypto",
  cryptoOn: "api-crypto-on",
  fs: "api-fs",
  fsOn: "api-fs-on",
  orm: "api-orm",
  ormOn: "api-orm-on",
  sql: "api-sql",
  sqlOn: "api-sql-on",
  netOn: "api-network-on",
  netRec: "api-network-rec",
  tcpOn: "api-tcp-on",
  tcpRec: "api-tcp-rec",
  coapOn: "api-coap-on",
  coapRec: "api-coap-rec",
  coap2On: "api-coap2-on",
  coap2Rec: "api-coap2-rec",
  canHandle: "api-can-handle",
  canOn: "api-can-on",
  blueHandle: "api-blue-handle",
  blueOn: "api-blue-on",
  blueRec: "api-blue-rec",
  bufferOn: "api-buffer-on",
  serialportHandle: "api-serialport-handle",
  serialportOn: "api-serialport-on",
  serialportRec: "api-serialport-rec",
  simulatorOn: "api-simulator-on",
  simulatorRec: "api-simulator-rec",
  grpc: "api-grpc",
  grpcOn: "api-grpc-on",
  grpcRec: "api-grpc-rec",
  hdc: "api-hdc",
  hdcOn: "api-hdc-on",
  usb: "api-usb",
  jfrog: "api-jfrog",
  git: "api-git",
  gitOn: "api-git-on",
  scp: "api-scp",
  nats: "api-nats",
  natsRec: "api-nats-rec",
  processOn: "api-process-on"
};

export const updateConstant = {
  submitUpdate: "submitUpdate",
  checkForUpdates: "checkForUpdates",
  onUpdateAvailable: "onUpdateAvailable",
  onprogress: "onprogress"
};

export const sftpConstant = {
  init: "sftp-init",
  activeNode: "sftp-activenode",
  download: "sftp-download",
  deleteFile: "sftp-deleteFile",
  initLocal: "sftp-init-local",
  setDirtoType: "sftp-setdirtotype",
  upload: "sftp-upload"
};

export const sshConstant = {
  connect: "ssh-connect",
  onStream: "ssh-on-stream",
  sendWrite: "ssh-send-write",
  destory: "ssh-close"
};

export const mqttConstant = {
  connect: "mqtt-connect",
  subscribe: "mqtt-on-subscribe",
  unsubscribe: "mqtt-on-unsubscribe",
  onmessage: "mqtt-on-onmessage",
  publish: "mqtt-send-publish",
  end: "mqtt-end"
};
