//@ts-nocheck
import { emit } from "@pso/util/event";
import { pmlog } from "@pso/util/log";
import { joinTWClass } from "@pso/util/tailwind";
import { useSelector } from "react-redux";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function DurationOverlay({}) {
  const display = useSelector(
    (s) => s.component_data.debug.duration_overlay.display,
  );
  if (!display) return <></>;
  const duration = useSelector(
    (s) => s.component_data.chess_board.clock_info_panel.duration,
  );
  return (
    <div
      className={joinTWClass(
        "absolute",
        "h-[40%] w-[25%]",
        "left-0 top-[25%]",
        "bg-white/10",
        "text-white text-2xl",
        "flex items-start justify-center flex-col gap-2",
        "p-2",
      )}
    >
      <div className="w-[90%] h-[30%]">
        <input
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
                response: { jingalala: true },
              });
              // pmlog(
              //   "submit",
              //   e.persist,
              //   e.key,
              //   e.target,
              //   e.currentTarget.value,
              // );
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
