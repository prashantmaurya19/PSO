import { joinTWClass } from "../utils/tailwind";
import { checkHealthRequest, loginToAuthService } from "../utils/exp";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SocketHandler } from "../utils/sock-const";
import { twMerge } from "tailwind-merge";

/**
 * @param {{test:string}&import("../utils/jjsx").JSXElement} p
 */
function OpsButton({ text = "", className = "", ...a }) {
  return (
    <button
      {...a}
      className={twMerge(
        joinTWClass(
          "max-h-[20%] max-w-[20%] p-1",
          "border-gray-600 border-3 border-solid rounded-[3px]",
          "active:scale-[0.96]",
          "hover:border-gray-100",
          "flex justify-center items-center grow-1",
          "text-xl text-white",
        ),
        className,
      )}
    >
      {text}
    </button>
  );
}

export function WebSocketEndPointSuit() {
  const [isconnected, setConnected] = useState(false);
  /**
   * @type {SocketHandler}
   */
  const socket = useSelector((s) => s.socket.socket);
  const url = "http://localhost:8080/ps/ws/v1";
  socket.connect(
    url,
    () => {
      console.log(
        "%csubscribe: is_connected= " + socket.isConnected(),
        "color: pink;font-size: 16px",
      );
      setConnected(true);
      socket.subscribe(
        {
          topic: "/t1/tdemo",
        },
        {
          topic: "/c1/user@chess.com/game_event",
        },
      );
    },
    () => {},
  );

  return (
    <div
      className={joinTWClass(
        "w-full h-[100vh]",
        "flex justify-center items-start",
      )}
    >
      <div
        className={joinTWClass(
          "h-[95%] w-[95%] p-3",
          "flex justify-start items-start flex-wrap gap-1.5",
          "text-white",
          "border-1 border-solid border-amber-300",
        )}
      >
        <OpsButton
          text="login"
          onClick={() => {
            loginToAuthService(
              "http://localhost:8080/ur/user/login",
              "user@chess.com",
              "prashant",
            );
          }}
        />
        <OpsButton
          className={joinTWClass(
            isconnected ? "border-green-600" : "border-red-500",
          )}
          onClick={() => {
            socket.send("/w1/demo", "hellow server");
          }}
          text="run"
        />

        <OpsButton
          onClick={() => {
            socket.send("/w1/game_request", {
              type: "3min",
              user: "user@chess.com",
            });
          }}
          text="add game request"
        />

        <OpsButton
          onClick={() => {
            checkHealthRequest();
          }}
          text="check health"
        />
      </div>
    </div>
  );
}
