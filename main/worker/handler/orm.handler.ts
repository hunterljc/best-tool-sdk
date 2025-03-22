import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import orm from "../../utils/orm";
import WorkerService from "../worker.service";

const ormHandler: EmitterListenerHandler = async ({ method, args }) => {
  if (orm[method]) {
    const res = await orm[method](...args);
    if (res) {
      WorkerService.getInstance().workerEventEmitter.send(workerEvent.ormOn, {
        type: "worker" + method,
        data: JSON.stringify(res)
      });
    }
  }
};

export default ormHandler;
