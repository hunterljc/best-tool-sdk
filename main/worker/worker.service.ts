import WorkerEventEmitter from "../../common/worker-emitter";
import createWorker from "./worker?nodeWorker";

class WorkerService {
  private static instance: WorkerService;

  public static getInstance(): WorkerService {
    if (!WorkerService.instance) {
      WorkerService.instance = new WorkerService();
    }
    return WorkerService.instance;
  }

  public workerEventEmitter: WorkerEventEmitter;

  constructor() {
    const _worker = createWorker({ workerData: "worker" });

    const _eventEmitter = new WorkerEventEmitter(_worker);
    _eventEmitter.setMaxListeners(0);
    this.workerEventEmitter = _eventEmitter;
  }

  send(eventName: string, args: object) {
    if (this.workerEventEmitter === undefined) return;
    this.workerEventEmitter.send(eventName, args);
  }

  closeWorkerEmitter() {
    this.workerEventEmitter.removeAllListeners();
    this.workerEventEmitter.closeWorker();
  }
}

export default WorkerService;
