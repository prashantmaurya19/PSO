import { pmlog } from "@pso/util/log";
import { request } from "@pso/util/requests";
import { socket } from "@pso/util/socket";
import { credintials } from "./debug-data";
import { profile_name } from "./profile-data";
import { parseUserAddress } from "@pso/util/api";
import { emit } from "@pso/util/event";
import { combine } from "@pso/util/aobject";
import { parse } from "@pso/util/chess";
import { extendTailwindMerge } from "tailwind-merge";
import { UNSAFE_useFogOFWarDiscovery } from "react-router-dom";

/**
 * @type {Partial<{username:string,initialized:boolean,userinfo:{firstname:string,lastname:string,info:{rating:number}},post_info:{from:string,to:string}}>}
 */
export const RESULT = { initialized: false };

/**
 * @type {Record<import("@pso/util/socket").SocketChessAction,function({payload:{user:object,action:import("@pso/util/socket").SocketChessAction,from:string,to:string,topic:string,payload:object}}):void>}
 */
export const event_handlers = {
  move_played({ payload }) {
    emit("SOCKET_GAME_EVENT_RECIVED", payload);
  },
  async init({ payload }) {
    RESULT.post_info = {
      from: payload.to,
      to: payload.from,
    };
    const res = await request(
      `/ur/user/get_info/${parseUserAddress(payload.from).username}`,
    )
      .get()
      .execute();
    payload.user = await res.json();
    emit("SOCKET_GAME_EVENT_RECIVED", payload);
  },
  request({ payload }) {
    payload.payload = JSON.parse(payload.payload);
    if (payload.payload?.accept == undefined) {
      emit("SOCKET_GAME_REQUEST_RECIVED", payload);
    } else if (payload.payload.title == "Draw") {
      emit("SOCKET_GAME_DRAW_REQUEST_RECIVED", payload);
    }
  },
  resign({ payload }) {
    emit("BOARD_RESIGN", payload);
  },
};

/**
 * @type {Array<{name:string,config:function():Promise<void>}>}
 */
export const INITIALIZATION_TASK_LIST = [
  {
    name: "Security Check Up",
    config() {
      return new Promise(async (resolve, reject) => {
        const res = await request("/ur/user/verify")
          .credentials("include")
          .get()
          .execute();
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
        socket.connect(
          "http://localhost:8080/ps/ws/v1",
          () => {
            socket.subscribe(
              {
                topic: "/t1/tdemo",
              },
              {
                topic: `/c1/${RESULT.username}/game_event`,
                async onSubscribe(topic, msg) {
                  const data = msg.json();
                  const payload = combine(
                    {
                      user: null,
                      action: null,
                      topic,
                    },
                    data,
                  );
                  await event_handlers[payload.action]({ payload });
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
          RESULT.userinfo = data;
          console.log(data, res);
          if (res.status == 200) {
            resolve();
            RESULT.initialized = true;
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
