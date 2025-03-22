import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import scpUtil from "../../utils/scp";
import WorkerService from "../worker.service";

const reply = [
  "init",
  "close",
  "list",
  "exists",
  "uploadFile",
  "uploadDir",
  "mkdir",
  "downloadFile",
  "downloadDir",
  "unlink",
  "rmdir"
];

const scpHandler: EmitterListenerHandler = async ({ method, src }) => {
  if (scpUtil[method]) {
    console.log("scpHandler", method);
    const res = await scpUtil[method](src);
    if (reply.includes(method)) {
      WorkerService.getInstance().workerEventEmitter.send(workerEvent.scpOn, {
        type: "worker" + method,
        data: res
      });
    }
  }
};

export default scpHandler;
