//@ts-nocheck
import { emit } from "@pso/util/event";
import { pmlog } from "@pso/util/log";
import { joinTWClass } from "@pso/util/tailwind";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function DurationOverlay({}) {
  const moves = [
    "e4",
    "e5",
    "Nf3",
    "Nc6",
    "Bc4",
    "Nf6",
    "O-O",
    "Bc5",
    "c3",
    "d6",
    "d4",
    "exd4",
    "cxd4",
    "Bb6",
    "Bg5",
    "h6",
    "Bh4",
    "g5",
    "Nxg5",
    "hxg5",
    "Bxg5",
    "Rg8",
    "h4",
    "Nxd4",
    "Nc3",
    "c6",
    "e5",
    "dxe5",
    "Ne4",
    "Rg6",
    "Qh5",
    "Qe7",
    "Qh8+",
    "Kd7",
    "Nxf6+",
    "Rxf6",
    "Bxf6",
    "Qd6",
    "Bxe5",
    "Qc5",
    "Bxd4",
    "Qxd4",
    "Rad1",
    "Qxd1",
    "Rxd1+",
    "Kc7",
    "Qe5#",
  ];
  const [index, setIndex] = useState(0);
  const display = useSelector(
    (s) => s.component_data.debug.duration_overlay.display,
  );
  if (!display) return <></>;
  const duration = useSelector(
    (s) => s.component_data.chess_board.clock_info_panel.duration,
  );
  const inputele = useRef();
  const dump = { move: moves[index] };
  useEffect(() => {
    inputele.current.value = JSON.stringify(dump);
  });
  return (
    <div
      className={joinTWClass(
        "absolute",
        "h-[40%] w-[25%]",
        "left-0 top-[25%]",
        "bg-white/10",
        "text-white text-2xl",
        "flex items-start justify-start flex-col gap-2",
        "p-2",
      )}
    >
      <div className="w-[90%] h-[30%]">
        <input
          ref={inputele}
          type="text"
          placeholder="Enter json for game event"
          className={joinTWClass(
            "w-full h-full",
            "border-2 border-solid border-gray-600",
            "text-xl text-white",
            "p-1",
          )}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              emit("SOCKET_GAME_EVENT_RECIVED", {
                test: dump,
                response: { jingalala: true },
              });
              setIndex(index + 1);
            }
          }}
        />
      </div>
      {(function (d) {
        if (d == null) {
          return "no duration";
        }
        return JSON.stringify(d, null, " ");
      })(duration)}
    </div>
  );
}
