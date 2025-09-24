import { pmlog } from "@pso/util/log";
import { request } from "@pso/util/requests";
import { socket } from "@pso/util/socket";
import { credintials } from "./debug-data";
import { profile_name } from "./profile-data";

/**
 * @type {Partial<{username:string}>}
 */
export const RESULT = {};

/**
 * @type {Array<{name:string,config:function():Promise<void>}>}
 */
export const INITIALIZATION_TASK_LIST = [
  {
    name: "Security Check Up",
    config() {
      return new Promise(async (resolve, reject) => {
        const res = await request("/ur/user/verify").get().execute();
        const data = await res.json();
        RESULT.username = data.username;
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
        pmlog("connect");
        socket.connect(
          "http://localhost:8080/ps/ws/v1",
          () => {
            socket.subscribe(
              {
                topic: "/t1/tdemo",
              },
              {
                topic: `/c1/${RESULT.username}/game_event`,
                onSubscribe(topic, msg) {
                  pmlog(msg, topic);
                },
              },
            );
            resolve();
          },
          () => {
            console.log("failed");
            reject();
          },
        );
        pmlog("connect");
      });
    },
  },
  {
    name: "Getting User Info",
    config() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await request("/ur/user").get().execute();
          const data = await res.json();
          console.log(data, res);
          if (res.status == 200) {
            resolve();
          } else {
            reject();
          }
        } catch {
          pmlog(
            credintials[profile_name].username,
            RESULT.username,
            credintials[profile_name].username == RESULT.username,
          );
          if (credintials[profile_name].username == RESULT.username) {
            return resolve();
          }
          reject();
        }
      });
    },
  },
];
