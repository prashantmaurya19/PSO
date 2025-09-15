//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { PlayerPanel } from "@pso/components/chess-arena/panels/player-panel";
import { ChessBoard } from "@pso/components/chess-arena/chess-board";
import { emit, useListen } from "@pso/util/event";
import { pmlog } from "@pso/util/log";
import { FenOverlay } from "../debug/overlay/fen-overlay";
import { useDispatch } from "react-redux";
import { updateChessBoardFindOponentLoader } from "@pso/store/feature/component-data";
import { acache } from "@pso/util/cache";
import { setDataChessBoardDuration } from "@pso/store/feature/chess-data";
import { DurationOverlay } from "../debug/overlay/duration-overlay";
import { useEffect } from "react";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function ChessArena({ className, ...a }) {
  const dispatch = useDispatch();
  useListen("GAME_INITIALIZED", (e) => {
    pmlog(e);
    pmlog("GAME_INITIALIZED ");
  });
  useListen("GAME_STARTED", (e) => {
    dispatch(updateChessBoardFindOponentLoader({ display: true }));
    /** @type {import("@pso/util/time").DurationCache} */
    const duration = acache("LAST_GAME_DURATION").localstorage().get().json();
    if (duration == null) return;
    dispatch(setDataChessBoardDuration(duration));
  });
  setTimeout(() => {
    // this is for testing
    dispatch(updateChessBoardFindOponentLoader({ display: false }));
  }, 1000);
  useEffect(() => {
    emit("GAME_STARTED", {});
    emit("GAME_INITIALIZED", {});
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
      <PlayerPanel className="items-end" pid="o" />
      <ChessBoard />
      <PlayerPanel pid="p" />
      <FenOverlay />
      <DurationOverlay />
    </div>
  );
}
