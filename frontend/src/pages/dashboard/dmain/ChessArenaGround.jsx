import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";
import { ContextContainer } from "../../../components/page/context-container";
import { ChessArena } from "../../../components/chess-arena";

/**
 * @param {import("../../../util/jjsx").JSXElement} p0
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
