import { request } from "@pso/util/requests";
import { socket } from "@pso/util/socket";

/**
 * @type {Array<{name:string,config:function():Promise<void>}>}
 */
export const INITIALIZATION_TASK_LIST = [
  {
    name: "Security Check Up",
    config() {
      return new Promise(async (resolve, reject) => {
        const res = await request("/ur/user/verify").get().execute();
        console.log(await res.json(), res);
        if (res.status == 200) {
          resolve();
        } else {
          reject();
        }
      });
    },
  },
  {
    name: "Connecting to Server",
    config() {
      return new Promise((resolve, reject) => {
        socket.connect("http://localhost:8080/ps/ws/v1", resolve, reject);
      });
    },
  },
];
