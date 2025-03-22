import { workerEvent } from "../config/worker.config";
import { workerEventEmitter } from "../../common/worker-emitter";
import fsHandler from "./handler/fs.handler";
import cryptoHandler from "./handler/crypto.handler";
import downloadHandler from "./handler/download.handler";
// ======================动态注入===============================

workerEventEmitter.on(workerEvent.fs, fsHandler);
workerEventEmitter.on(workerEvent.crypto, cryptoHandler);
workerEventEmitter.on(workerEvent.download, downloadHandler);
