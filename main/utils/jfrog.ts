import jfrog from "jfrog-client-js";

export default class JfrogUtil {
  public static timer = 0;
  public static isOnLine = true;
  public static jfrogClient;

  public static init(): void {
    this.jfrogClient = new jfrog.JfrogClient({
      platformUrl: "http://repo.hdzkyf.cn/",
      // artifactoryUrl - Set to use a custom Artifactory URL.
      // xrayUrl - Set to use a custom Xray URL.
      username: "admin",
      password: "HdZk123456!",
      // Optional parameters
      // proxy: {
      //   host: "<organization>-xray.jfrog.io",
      //   port: 8081,
      //   protocol: "https",
      // },
      // headers: { key1: "value1", key2: "value2" },
      // Connection retries. If not defined, the default value is 5.
      retries: 5,
      // Timeout before the connection is terminated in milliseconds, the default value is 60 seconds
      timeout: 60000,
      // Status codes that trigger retries. the default is network error or a 5xx status code.
      retryOnStatusCode: (statusCode) => statusCode >= 500,
      // Delay between retries, in milliseconds. The default is 1000 milliseconds.
      retryDelay: 1000
    });
  }

  //测试仓库是否通畅
  public static async ping(): Promise<boolean> {
    try {
      this.init();
      let res = await this.jfrogClient.artifactory().system().ping();
      return true;
    } catch (error) {
      return false;
    }
  }
  //从仓库下载文件
  public static async download(src: Array<string>): Promise<boolean> {
    try {
      let res = await this.jfrogClient
        .artifactory()
        .download()
        .downloadArtifactToFile(src[0], src[1]);
      return true;
    } catch (error) {
      return false;
    }
  }
}
