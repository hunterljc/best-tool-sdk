import { IApi } from "./ipc_types";

import dialogIpc from "./ipcs/dialog.ipc";
import windowIpc from "./ipcs/window.ipc";
import fsIpc from "./ipcs/fs.ipc";
import downloadIpc from "./ipcs/download.ipc";
import cryptoIpc from "./ipcs/crypto.preload";
import appIpc from "./ipcs/app.preload";
import log from "./ipcs/log.preload";
import IOrm from "./ipcs/orm.preload";
import pathIpc from "./ipcs/path.preload";
import sqlIpc from "./ipcs/sql.preload";
import netWorkIpc from "./ipcs/network.preload";
import coapIpc from "./ipcs/coap.preload";
import coap2Ipc from "./ipcs/coap2.preload";
import canIpc from "./ipcs/can.preload";
import sshIpc from "./ipcs/ssh.preload";
import sftpIpc from "./ipcs/sftp.preload";
import grpcIpc from "./ipcs/grpc.preload";
import IHdcIpc from "./ipcs/hdc.preload";
import jfrogIpc from "./ipcs/jfrogclient.preload";
import blueIpc from "./ipcs/blue.preload";
import serialportIpc from "./ipcs/serialport.preload";
import simulatorIpc from "./ipcs/simulator.preload";
import gitIpc from "./ipcs/git.preload";
import scpIpc from "./ipcs/scp.preload";
import natsIpc from "./ipcs/nats.preload";
import bufferIpc from "./ipcs/buffer.preload";
import mqttIpc from "./ipcs/mqtt.preload";
import processIpc from "./ipcs/process.preload";

export const api: IApi = {
  app: appIpc,
  wind: windowIpc,
  dialog: dialogIpc,
  download: downloadIpc,
  buffer: bufferIpc,
  fs: fsIpc,
  path: pathIpc,
  sql: sqlIpc,
  log,
  crypto: cryptoIpc,
  netWork: netWorkIpc,
  coap: coapIpc,
  coap2: coap2Ipc,
  can: canIpc,
  grpc: grpcIpc,
  ssh: sshIpc,
  sftp: sftpIpc,
  hdc: IHdcIpc,
  orm: IOrm,
  jfrog: jfrogIpc,
  blue: blueIpc,
  serialport: serialportIpc,
  simulator: simulatorIpc,
  git: gitIpc,
  scp: scpIpc,
  nats: natsIpc,
  mqtt: mqttIpc,
  process: processIpc
};
