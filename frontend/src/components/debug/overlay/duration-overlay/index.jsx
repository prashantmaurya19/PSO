//@ts-nocheck
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
  const duration = useSelector((s) => s.chess.duration);
  return (
    <div
      className={joinTWClass(
        "absolute",
        "h-[40%] w-[25%]",
        "left-0 top-[25%]",
        "bg-white/10",
        "text-white text-2xl",
        "flex items-start justify-center flex-col",
        "p-2",
      )}
    >
      {(function (d) {
        if (d == null) {
          return "no duration";
        }
        return JSON.stringify(d, null, " ");
      })(duration)}
    </div>
  );
}
