import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { ContextContainer } from "@pso/components/page/context-container";
import { ChessArena } from "@pso/components/chess-arena";

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
          "h-[97%] aspect-[0.8]",
        )}
      >
        <ChessArena />
      </div>
    </ContextContainer>
  );
}
