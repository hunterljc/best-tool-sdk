import natsUtil from "../../utils/nats";
import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import WorkerService from "../worker.service";

const reply = ["init", "subscribe", "publish", "closed", "drain"];

const natsHandler: EmitterListenerHandler = async ({ method, src }) => {
  console.log("natsHandler", method, src);
  if (natsUtil[method]) {
    if (method === "subscribe") {
      natsUtil.subscribe(src, (msg: unknown) => {
        WorkerService.getInstance().workerEventEmitter.send(workerEvent.natsOn, {
          type: "worker" + method,
          data: msg
        });
      });
    } else {
      const res = await natsUtil[method](src);
      if (reply.includes(method)) {
        WorkerService.getInstance().workerEventEmitter.send(workerEvent.natsOn, {
          type: "worker" + method,
          data: res
        });
      }
    }
  }
};

export default natsHandler;
