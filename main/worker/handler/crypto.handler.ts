import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import CryptoUtil from "../../utils/crypto";
import WorkerService from "../worker.service";

const reply = ["zmjEncryption", "zmjDecryption", "readFileDecryptionProject", "publicDecrypt"];

const cryptoHandler: EmitterListenerHandler = async ({ method, args }) => {
  if (CryptoUtil[method]) {
    const res = CryptoUtil[method](...args);
    if (reply.includes(method)) {
      WorkerService.getInstance().workerEventEmitter.send(workerEvent.cryptoOn, {
        type: "worker" + method,
        data: res
      });
    }
  }
};

export default cryptoHandler;
