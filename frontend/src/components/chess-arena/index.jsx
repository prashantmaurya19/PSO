import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../util/tailwind";
import { SideInfoPanel } from "./panels/player-panel";
import { ChessBoard } from "./chess-board";
import { emit, Events, listen } from "../../util/event";

/**
 * @param {import("../../util/jjsx").JSXElement} p
 */
export function ChessArena({ className, ...a }) {
  listen(Events.GAME_INITIALIZED, () => {
    console.log("listeninga GAME_INITIALIZED");
  });
  listen(Events.BOARD_MOVE_PLAYED, (e) => {
    console.log(e);
  });
  emit(Events.GAME_INITIALIZED, {});
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
      <SideInfoPanel className="items-end" />
      <ChessBoard />
      <SideInfoPanel pid="o" />
    </div>
  );
}
