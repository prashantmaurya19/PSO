//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { emit, useListen } from "@pso/util/event";
import { pmlog } from "@pso/util/log";
import { useDispatch } from "react-redux";
import {
  initializeComponentForPlaying,
  initializeComponentsData,
  updateChessBoardDuration,
  updateChessBoardFindOponentLoader,
  updateClockInfoPanelState,
  updateMoveListFlip,
} from "@pso/store/feature/component-data";
import { acache } from "@pso/util/cache";
import { useEffect } from "react";
import { PlayerPanel } from "@pso/components/chess-arena/player-panel";
import { ChessBoard } from "@pso/components/chess-arena/chess-board";
import { FenOverlay } from "@pso/components/debug/overlay/fen-overlay";
import { DurationOverlay } from "../debug/overlay/duration-overlay";
import { MoveListPanel } from "./move-list-panel";
import {
  initializeChessBoardData,
  setDataChessBoardPlayer,
} from "@pso/store/feature/chess-data";
import { sendGameRequest, socket } from "@pso/util/socket";
import {
  GameEventAction,
  SOCKET_GAME_REQUEST_ENDPOINT,
} from "@pso/var-data/api-data";
import { RESULT } from "@pso/var-data/initialization-data";
import { REQUESTS } from "@pso/var-data/app-data";
import { TIME_DURATION_CATAGORIES } from "@pso/util/time";
import { Navigate } from "react-router-dom";
import { formatPlayerName } from "@pso/util/astring";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function ChessArena({ className, ...a }) {
  if (!RESULT.initialized) {
    return (
      <Navigate to={"/dashboard"} state={{ to: "/dashboard/chess_arena" }} />
    );
  }
  const dispatch = useDispatch();
  useListen("GAME_INITIALIZED", (e) => {
    const duration = acache("LAST_GAME_DURATION")
      .localstorage()
      .getOrDefault(JSON.stringify(TIME_DURATION_CATAGORIES[4]))
      .json();
    dispatch(initializeChessBoardData());
    dispatch(
      initializeComponentsData({
        duration,
      }),
    );
    pmlog(REQUESTS.open_game_requests, duration.label, RESULT.username);
    sendGameRequest(duration.label);
  });
  useListen("GAME_STARTED", (e) => {
    e.payload = JSON.parse(e.payload);
    dispatch(
      setDataChessBoardPlayer({
        name: formatPlayerName(e.user.firstname, e.user.lastname),
        rating: e.user.info.rating,
        side: e.payload.side,
      }),
    );
    pmlog(e, e.payload);
    dispatch(initializeComponentForPlaying(e.payload.side == "w"));
  });
  useListen("SOCKET_GAME_EVENT_RECIVED", (e) => {
    switch (e.action) {
      case GameEventAction.INIT: {
        emit("GAME_STARTED", e);
        break;
      }
      case GameEventAction.MOVE_PLAYED: {
        e.payload = JSON.parse(e.payload);
        emit("TEST", { test: { move: e.payload.notation } });
      }
    }
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
