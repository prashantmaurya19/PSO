//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { emit, useListen } from "@pso/util/event";
import { pmlog } from "@pso/util/log";
import { useDispatch } from "react-redux";
import {
  initializeComponentsData,
  updateChessBoardDuration,
  updateChessBoardFindOponentLoader,
} from "@pso/store/feature/component-data";
import { acache } from "@pso/util/cache";
import { useEffect } from "react";
import { PlayerPanel } from "@pso/components/chess-arena/player-panel";
import { ChessBoard } from "@pso/components/chess-arena/chess-board";
import { FenOverlay } from "@pso/components/debug/overlay/fen-overlay";
import { DurationOverlay } from "../debug/overlay/duration-overlay";
import { MoveListPanel } from "./move-list-panel";
import { initializeChessBoardData } from "@pso/store/feature/chess-data";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function ChessArena({ className, ...a }) {
  const dispatch = useDispatch();
  useListen("GAME_INITIALIZED", (e) => {
    dispatch(initializeChessBoardData());
    dispatch(initializeComponentsData());
  });
  useListen("GAME_STARTED", (e) => {
    // once oponent found here
    // will thing initialize for game
  });
  useEffect(() => {
    emit("GAME_INITIALIZED", {});
  }, []);
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-[62%] h-full",
          "flex justify-center items-center flex-col",
        ),
      )}
    >
      <PlayerPanel className="items-end" pid="o" />
      <ChessBoard />
      <PlayerPanel pid="p" />
    </div>
  );
}
