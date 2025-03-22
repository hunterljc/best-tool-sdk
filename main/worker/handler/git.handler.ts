import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import gitUtil from "../../utils/git";
import WorkerService from "../worker.service";

const gitHandler: EmitterListenerHandler = async ({ method, args }) => {
  if (gitUtil[method]) {
    const res = await gitUtil[method](...args);
    if (res) {
      WorkerService.getInstance().workerEventEmitter.send(workerEvent.gitOn, {
        type: "worker" + method,
        data: res
      });
    }
  }
};

export default gitHandler;
