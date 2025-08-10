import { joinTWClass } from "../utils/tailwind";

export default function WebSocketEndPointSuit() {
  return (
    <div
      className={joinTWClass("w-full h-max", "flex justify-center items-start")}
    >
      <div className="w-full h-[7vh] flex justify-around items-center text-white">
        <button className="w-[10%] h-[90%] border-1 border-solid border-white flex justify-center items-center text-2xl">
          run
        </button>
        <input placeholder="Enter Url" className="w-[40%] h-[90%] p-1 border-gray-600 border-1 border-solid" />
        <input placeholder="Enter Topics" className="w-[40%] h-[90%] p-1 border-gray-600 border-1 border-solid" />
      </div>
    </div>
  );
}
