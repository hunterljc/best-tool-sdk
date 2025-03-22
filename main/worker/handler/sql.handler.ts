import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import { sqlManage } from "../../utils/sql/SqlManage";
import WorkerService from "../worker.service";

const sqlHandler: EmitterListenerHandler = async ({ method, args }) => {
  const _sqlManager = new sqlManage(args[1]);
  if (_sqlManager[method]) {
    const res = await _sqlManager[method](args[0]);
    WorkerService.getInstance().workerEventEmitter.send(workerEvent.sqlOn, {
      type: "worker" + method,
      data: res
    });
  }
};

export default sqlHandler;
