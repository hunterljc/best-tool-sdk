import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import DownloadDbProvider from "../../db/download.db";
import WorkerService from "../worker.service";

const downloadHandler: EmitterListenerHandler = async ({ method, args }) => {
  const bProvider = DownloadDbProvider.getInstance();
  if (bProvider[method]) {
    const res = await bProvider[method](...args);
    if (res) {
      WorkerService.getInstance().workerEventEmitter.send(workerEvent.downloadOn, {
        type: "worker" + method,
        data: res
      });
    }
  }
};

export default downloadHandler;
