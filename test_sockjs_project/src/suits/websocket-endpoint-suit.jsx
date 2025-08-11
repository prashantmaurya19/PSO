import { joinTWClass } from "../utils/tailwind";
import { useSockJSConnection } from "../utils/sock-util";
import { loginToAuthService } from "../utils/exp";
export default function WebSocketEndPointSuit() {
  const { isConnected, sendMessage } = useSockJSConnection(
    "http://localhost:8081/us/ws/v1",
    ["/t1/tdemo"],
    (msg) => console.log(msg),
  );

  return (
    <div
      className={joinTWClass("w-full h-max", "flex justify-center items-start")}
    >
      <div className="w-full h-[7vh] flex justify-around items-center text-white">
        <button
          className={joinTWClass(
            "w-[40%] h-[90%] p-1",
            "border-gray-600 border-1 border-solid",
            "active:scale-[0.96]",
            "flex justify-center items-center",
            "text-2xl",
          )}
          onClick={() => {
            loginToAuthService();
          }}
        >
          log in
        </button>
        <button
          className={joinTWClass(
            "w-[10%] h-[90%]",
            "border-1 border-solid",
            "flex justify-center items-center",
            "text-2xl",
            "active:scale-[0.96]",
            isConnected ? "border-green-600" : "border-red-500",
          )}
          onClick={() => {
            sendMessage("/w1/demo", "hellow server");
          }}
        >
          run
        </button>
        <input
          placeholder="Enter Topics"
          className="w-[40%] h-[90%] p-1 border-gray-600 border-1 border-solid"
        />
      </div>
    </div>
  );
}
