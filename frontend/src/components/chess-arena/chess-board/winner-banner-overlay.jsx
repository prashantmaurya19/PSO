//@ts-nocheck

import { FontAwesomeChessPiece } from "@pso/components/icon/fontawesome";
import { pmlog } from "@pso/util/log";
import { joinTWClass } from "@pso/util/tailwind";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

/**
 * @param {{color:import("@pso/util/chess").ChessColor,piece:import("@pso/util/chess").FenChar}&import("@pso/util/jjsx").JSXProps} p
 */
function WinnerKing({ color, piece, className, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass("w-[40%] aspect-square", "relative"),
        className,
      )}
    >
      <FontAwesomeChessPiece
        className={joinTWClass("w-full h-full", "bg-transparent", "p-2")}
        fenChar={piece}
        iconProps={{ style: { color: color == "w" ? "white" : "black" } }}
      />
    </div>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function GameWinnerBannerOverlay({ ...a }) {
  const option = useSelector(
    (s) => s.component_data.chess_board.game_winner_banner_overlay,
  );
  pmlog(option);
  if (!option.display) return <></>;
  return (
    <div
      {...a}
      className={joinTWClass(
        "absolute",
        "w-full h-full",
        "backdrop-blur-xs",
        "bg-black/30",
        "flex items-center justify-center flex-col",
      )}
    >
      <WinnerKing piece={option.piece} color={option.color} />
      <span
        className={joinTWClass(
          "w-1/2 h-fit",
          "text-4xl text-white",
          "text-center font-bold",
        )}
      >
        {option.text}
      </span>
    </div>
  );
}
