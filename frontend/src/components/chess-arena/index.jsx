import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../util/tailwind";
import { SideInfoPanel } from "./panels/player-panel";
import { ChessBoard } from "./chess-board";
import { clear, emit, Events, listen, useListen } from "../../util/event";
import { useEffect } from "react";
import { pmlog } from "../../util/log";

/**
 * @param {import("../../util/jjsx").JSXElement} p
 */
export function ChessArena({ className, ...a }) {
  useListen("GAME_INITIALIZED", (e) => {
    pmlog(e);
  });
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-full h-full",
          "flex justify-center items-center flex-col",
        ),
      )}
    >
      <SideInfoPanel className="items-end" pid="o" />
      <ChessBoard />
      <SideInfoPanel pid="p" />
    </div>
  );
}
