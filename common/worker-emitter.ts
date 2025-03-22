import { Worker, isMainThread, parentPort } from "worker_threads";
import { EventEmitter } from "events";

class WorkerEventEmitter extends EventEmitter {
  private worker: Worker | undefined;

  constructor(workerInstance?: Worker) {
    super();

    if (workerInstance) {
      this.worker = workerInstance;
      // 设置最大监听数,默认情况下，如果为特定事件添加了超过 10 个监听器，
      // 则 EventEmitter 会打印一个警告。这有助于发现内存泄露。但是，并不是所有的事件都要限制 10 个监听器。
      // emitter.setMaxListeners() 方法可以为指定的 EventEmitter 实例修改限制。
      // 值设为 Infinity（或 0）表示不限制监听器的数量。返回对 EventEmitter 的引用，以便可以链式调用。
      // this.worker.setMaxListeners(0);
    }

    if (isMainThread && this.worker) {
      this.worker.on("message", (data) => {
        this.emit(data.eventName, data.args);
      });
    } else {
      // 工作线程接收外部消息
      parentPort?.on("message", (data) => {
        this.emit(data.eventName, data.args);
      });
    }
  }

  send(eventName: string, args: object) {
    if (isMainThread && this.worker) {
      this.worker.postMessage({ eventName, args });
    } else {
      // 工作线程发送消息
      parentPort?.postMessage({ eventName, args });
    }
  }

  closeWorker() {
    if (this.worker === undefined) return;
    this.worker.terminate();
  }
}

export const workerEventEmitter = new WorkerEventEmitter();
export default WorkerEventEmitter;
