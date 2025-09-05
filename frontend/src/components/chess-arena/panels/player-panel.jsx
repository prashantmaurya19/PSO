import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";
import { Avatar } from "../../profile/avatar";
import { useSelector } from "react-redux";
import { formatMiliSeconds } from "../../../util/time";

/**
 * @typedef {{pid:import("../../../store/feature/chess-data").PlayerType}} InfoProp
 * @param {import("../../../util/jjsx").JSXElement}
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
 * @typedef {InfoProp & import("../../../util/jjsx").JSXElement} PlayerInfoPanelProps
 * @param {PlayerInfoPanelProps} p
 */
function PlayerInfoPanel({ pid = "p", ...a }) {
  /**
   * @type {import("../../../store/feature/chess-data").PlayerData}
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
 * @param {InfoProp & import("../../../util/jjsx").JSXElement}
 */
function ClockInfoPanel({ pid = "p", className, ...a }) {
  /**
   * @type {import("../../../store/feature/chess-data").PlayerData}
   */
  const { clockTime } = useSelector((s) => {
    return s.chess.players_data[pid];
  });
  return (
    <InfoPanel
      {...a}
      className={twMerge(
        joinTWClass(
          "min-w-[30%] w-[20%]",
          "text-white text-5xl",
          "border-1 border-solid border-gray-500",
        ),
        className,
      )}
    >
      {formatMiliSeconds(clockTime)}
    </InfoPanel>
  );
}

/**
 * @param {InfoProp&{playerProps:PlayerInfoPanelProps,timeProps:import("../../../util/jjsx").JSXElement}&import("../../../util/jjsx").JSXElement}
 */
export function SideInfoPanel({
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
