//@ts-nocheck
import { joinTWClass } from "@pso/util/tailwind";
import { twMerge } from "tailwind-merge";

/**
 * @param {{player_name:string}&import("@pso/util/jjsx").JSXProps} p
 */
function PlayerName({ player_name = "demo", className = "", ...a }) {
  return (
    <span
      className={twMerge(
        className,
        joinTWClass("grow-1", "text-2xl", "text-center"),
      )}
    >
      {player_name}
    </span>
  );
}

/**
 * @param {{player_name:string,oponent_name:string}&import("@pso/util/jjsx").JSXProps} p
 */
export function VersesBanner({
  player_name,
  oponent_name,
  className = "",
  ...a
}) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-full h-[9%]",
          "flex justify-around items-center",
          "*:text-white *:h-full",
        ),
      )}
    >
      <PlayerName player_name={player_name} />
      <span className="w-[10%] text-center italic text-3xl">vs</span>
      <PlayerName player_name={oponent_name} />
    </div>
  );
}
