//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { Avatar } from "@pso/components/profile/avatar";
import { useSelector } from "react-redux";
import { formatMiliSeconds } from "@pso/util/time";

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
  /**
   * @type {import("@pso/store/feature/chess-data").PlayerData}
   */
  const { clockTime } = useSelector((s) => {
    return s.chess.players_data[pid];
  });

  const turn = useSelector((s) => {
    return s.chess.turn;
  });

  const disabled = pid != turn;
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
        joinTWClass("flex justify-between items-start grow-1", "w-full"),
        className,
      )}
    >
      <PlayerInfoPanel {...playerProps} pid={pid} />
      <ClockInfoPanel {...timeProps} pid={pid} />
    </div>
  );
}
