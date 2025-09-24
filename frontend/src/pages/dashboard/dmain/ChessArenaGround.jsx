import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { ContextContainer } from "@pso/components/page/context-container";
import { ChessArena } from "@pso/components/chess-arena";
import { MoveListPanel } from "@pso/components/chess-arena/move-list-panel";
import { FenOverlay } from "@pso/components/debug/overlay/fen-overlay";
import { DurationOverlay } from "@pso/components/debug/overlay/duration-overlay";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p0
 */
export function ChessArenaGround({ className = "", ...a }) {
  return (
    <ContextContainer
      {...a}
      className={twMerge(
        joinTWClass("flex", "justify-center", "items-center"),
        className,
      )}
    >
      <div
        className={joinTWClass(
          "h-[97%] w-[60%]",
          "flex justify-center items-center",
          "transform-[translate(18%,0)]",
        )}
      >
        <ChessArena />
        <MoveListPanel />
      </div>
      <FenOverlay />
      <DurationOverlay />
    </ContextContainer>
  );
}
