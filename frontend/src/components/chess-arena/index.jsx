//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { emit, useListen } from "@pso/util/event";
import { pmlog } from "@pso/util/log";
import { useDispatch } from "react-redux";
import {
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

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function ChessArena({ className, ...a }) {
  const dispatch = useDispatch();
  useListen("GAME_INITIALIZED", (e) => {});
  useListen("GAME_STARTED", (e) => {
    dispatch(updateChessBoardFindOponentLoader({ display: false }));
    /** @type {import("@pso/util/time").DurationCache} */
    const duration = acache("LAST_GAME_DURATION").localstorage().get().json();
    if (duration == null) return;
    pmlog("GAME_STARTED", duration);
    dispatch(updateChessBoardDuration(duration));
  });
  // setTimeout(() => {
  //   // this is for testing
  //   dispatch(updateChessBoardFindOponentLoader({ display: false }));
  // }, 1000);
  useEffect(() => {
    emit("GAME_INITIALIZED", {});
    emit("GAME_STARTED", {});
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
