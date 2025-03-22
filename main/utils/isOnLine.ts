import { pingIP } from "./ping";

export default class isOnLineObj {
  public static timer = 0;
  public static isOnLine = true;

  public static startTimer(): void {
    this.timer = Number(
      setInterval(async () => {
        try {
          this.isOnLine = await pingIP();
        } catch (error) {
          this.isOnLine = false;
        }
      }, 1500)
    );
  }

  public static getState(): boolean {
    return this.isOnLine;
  }

  public static closeTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
}
