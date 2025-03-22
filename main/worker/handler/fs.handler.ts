import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import fsUtil from "../../utils/fs";
import WorkerService from "../worker.service";

const reply = [
  "readFileSync",
  "readFileBufferSync",
  "readdirSync",
  "readFileAbsBuff",
  "existsSync",
  "compressFile",
  "compressFiles",
  "compressArchiver",
  "uncompressFile",
  "readFileSize",
  "isDirectory"
];

const fsHandler: EmitterListenerHandler = async ({ method, args }) => {
  if (fsUtil[method]) {
    const res = await fsUtil[method](...args);
    if (reply.includes(method)) {
      WorkerService.getInstance().workerEventEmitter.send(workerEvent.fsOn, {
        type: "worker" + method,
        data: res
      });
    }
  }
};

export default fsHandler;
