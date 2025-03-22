import { EmitterListenerHandler } from "../../../types/common";
import { workerEvent } from "../../config/worker.config";
import NetworkUdp from "../../utils/network";
import NetworkTcp from "../../utils/networkTcp";
import WorkerService from "../worker.service";

const netHandler: EmitterListenerHandler = ({ method, model, args }) => {
  if (method === "listing") {
    const [net] = args;
    if (model == "udp") {
      NetworkUdp.listing(net, (msg: unknown) => {
        WorkerService.getInstance().workerEventEmitter.send(workerEvent.netOn, {
          type: "worker" + method,
          data: msg
        });
      });
    } else {
      NetworkTcp.listing(net, (msg: unknown) => {
        WorkerService.getInstance().workerEventEmitter.send(workerEvent.netOn, {
          type: "worker" + method,
          data: msg
        });
      });
    }
  } else {
    if (model == "udp") {
      if (NetworkUdp[method]) {
        NetworkUdp[method](...args);
      }
    } else {
      if (NetworkTcp[method]) {
        NetworkTcp[method](...args);
      }
    }
  }
};

export default netHandler;
