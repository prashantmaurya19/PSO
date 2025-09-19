//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { Avatar } from "@pso/components/profile/avatar";
import { useDispatch, useSelector } from "react-redux";
import { formatMiliSeconds } from "@pso/util/time";
import { useEffect } from "react";
import { changeChessBoardPlayerClockTime } from "@pso/store/feature/component-data";
import { pmlog } from "@pso/util/log";
import { emit } from "@pso/util/event";
import { setDataChessBoardGameState } from "@pso/store/feature/chess-data";

/**
 * @typedef {{pid:import("@pso/store/feature/chess-data").PlayerType}} InfoProp
 * @param {import("@pso/util/jjsx").JSXProps}
 */
function InfoPanel({ className, children, ...a }) {
  return (
    <span
      {...a}
      className={twMerge(
        joinTWClass(
          "w-max h-[80%]",
          "px-3",
          "flex justify-center items-center gap-4",
        ),
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * @typedef {InfoProp & import("@pso/util/jjsx").JSXProps} PlayerInfoPanelProps
 * @param {PlayerInfoPanelProps} p
 */
function PlayerInfoPanel({ pid = "p", ...a }) {
  /**
   * @type {import("@pso/store/feature/chess-data").PlayerData}
   */
  const { picture, name, rating } = useSelector((s) => {
    return s.chess.players_data[pid];
  });
  return (
    <InfoPanel {...a} className="items-start py-1">
      <span
        className={joinTWClass("h-full aspect-square", "block", "relative")}
      >
        <Avatar src={picture} className="absolute" />
      </span>
      <span className={joinTWClass("text-2xl text-white")}>
        {`${name} (${rating})`}
      </span>
    </InfoPanel>
  );
}

/**
 * @param {InfoProp & import("@pso/util/jjsx").JSXProps}
 */
function ClockInfoPanel({ pid = "p", className, ...a }) {
  /** @type {import("@pso/store/feature/chess-data").PlayerData} */
  const players_clock_data = useSelector((s) => {
    return s.component_data.chess_board.clock_info_panel[pid];
  });

  const clockTime = players_clock_data.clock;

  const turn = useSelector((s) => {
    return s.chess.turn;
  });

  /** @type {import("@pso/util/chess").GameStateName} */
  const state = useSelector((s) => {
    return s.chess.game_state;
  });

  const clock_info = useSelector((s) => {
    return s.component_data.chess_board.clock_info_panel;
  });
  const duration = clock_info.duration;
  const dec_time = clock_info.time_decrement_in_interval;

  const disabled = pid != turn;
  const dispatch = useDispatch();
  useEffect(() => {
    if (duration == undefined || state == "end" || disabled) return;
    if (clockTime + dec_time < 0) {
      emit("GAME_ENDED", {});
      dispatch(setDataChessBoardGameState("end"));
      return;
    }
    const id = setTimeout(() => {
      dispatch(changeChessBoardPlayerClockTime({ duration: dec_time, turn }));
    }, Math.abs(dec_time));

    return () => {
      clearTimeout(id);
    };
  }, [turn, clockTime]);
  return (
    <InfoPanel
      {...a}
      className={twMerge(
        joinTWClass(
          "min-w-[30%] w-[20%]",
          "text-white text-5xl",
          "border-1 border-solid border-gray-500",
          disabled ? "bg-gray-500/10 text-gray-400/80" : "",
        ),
        className,
      )}
    >
      {formatMiliSeconds(clockTime)}
    </InfoPanel>
  );
}

/**
 * @param {InfoProp&{playerProps:PlayerInfoPanelProps,timeProps:import("@pso/util/jjsx").JSXProps}&import("@pso/util/jjsx").JSXProps}
 */
export function PlayerPanel({
  pid = "p",
  playerProps = {},
  timeProps = {},
  className,
  ...a
}) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "flex justify-between items-start w-full aspect-[7]",
          "w-full",
        ),

        className,
      )}
    >
      <PlayerInfoPanel {...playerProps} pid={pid} />
      <ClockInfoPanel {...timeProps} pid={pid} />
    </div>
  );
}
