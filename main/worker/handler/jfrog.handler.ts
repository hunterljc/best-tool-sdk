import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import JfrogUtil from "../../utils/jfrog";
import WorkerService from "../worker.service";

const reply = ["ping", "download"];

const jfrogHandler: EmitterListenerHandler = async ({ method, src }) => {
  if (JfrogUtil[method]) {
    const res = await JfrogUtil[method](src);
    if (reply.includes(method)) {
      WorkerService.getInstance().workerEventEmitter.send(workerEvent.jfrogOn, {
        type: "worker" + method,
        data: res
      });
    }
  }
};

export default jfrogHandler;
