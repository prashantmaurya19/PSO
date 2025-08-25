import { joinTWClass } from "../utils/tailwind";
import { checkHealthRequest, loginToAuthService } from "../utils/exp";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { SocketHandler } from "../utils/sock-const";

/**
 * @param {{test:string}&import("../utils/jjsx").JSXElement} p
 */
function OpsButton({ text = "", className = "", ...a }) {
  return (
    <button
      {...a}
      className={joinTWClass(
        "max-h-[20%] max-w-[20%] p-1",
        "border-gray-600 border-3 border-solid rounded-[3px]",
        "active:scale-[0.96]",
        "hover:border-gray-100",
        "flex justify-center items-center grow-1",
        "text-xl text-white",
      )}
    >
      {text}
    </button>
  );
}

export function WebSocketEndPointSuit() {
  /**
   * @type {SocketHandler}
   */
  const socket = useSelector((s) => s.socket.socket);
  useEffect(() => {
    const url = "http://localhost:8080/ps/ws/v1";
    socket.connect(
      url,
      () => {
        console.log(
          "%csubscribe: is_connected= ",
          socket.is_connected,
          "color: pink;font-size: 20px",
        );
        socket.subscribe(
          {
            topic: "/t1/tdemo",
            onSubscribe: (message) => {
              const decoder = new TextDecoder("utf-8"); // Specify the encoding
              console.log(
                `%c/t1/tdemo message => ${decoder.decode(message.binaryBody)}`,

                "color: pink;font-size: 20px",
              );
            },
          },
          {
            topic: "/c1/xyzking10009@gmail.com/queue/messages",
            onSubscribe: (msg) => {
              console.log(msg);
            },
          },
        );
      },
      () => {},
    );
    return () => {
      socket.unsubscribe("/t1/tdemo");
      socket.disconnect();
    };
  }, [socket.isConnected()]);

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
            loginToAuthService();
          }}
        />
        <OpsButton
          className={joinTWClass(
            socket.isConnected() ? "border-green-600" : "border-red-500",
          )}
          onClick={() => {
            // sendMessage("/w1/demo", "hellow server");
            // send("/w1/demo", "hellow server");
            socket.send("/w1/demo", "hellow server");
          }}
          text="run"
        />

        <OpsButton
          onClick={() => {
            socket.send("/w1/game_request", {
              type: "3min",
              user: "xyzking10009@gmail.com",
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
