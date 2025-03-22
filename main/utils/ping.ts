import http from "http";
import { BASE_IP } from "../config/api";

export const pingIP = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    http
      .get(BASE_IP, (res) => {
        resolve(res.statusCode == 200 ? true : false);
      })
      .on("error", (error) => {
        reject(false);
      });
  });
};
