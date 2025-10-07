//@ts-nocheck

import { FontAwesomeChessPiece } from "@pso/components/icon/fontawesome";
import { setDataChessBoardGameState } from "@pso/store/feature/chess-data";
import { updateGameWinnerBannerOverlay } from "@pso/store/feature/component-data";
import { emit, useListen } from "@pso/util/event";
import { pmlog } from "@pso/util/log";
import { join, joinTWClass } from "@pso/util/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
function BannerIconLayout({ className, children }) {
  return (
    <div
      className={twMerge(
        joinTWClass("w-[40%] aspect-square", "relative"),
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * @param {{color:import("@pso/util/chess").ChessColor,piece:import("@pso/util/chess").FenChar}&import("@pso/util/jjsx").JSXProps} p
 */
function WinnerKing({ color, piece, ...a }) {
  return (
    <FontAwesomeChessPiece
      className={joinTWClass("w-full h-full", "bg-transparent", "p-2")}
      fenChar={piece}
      iconProps={{ style: { color: color == "w" ? "white" : "black" } }}
    />
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
function DrawBanner({ className }) {
  return (
    <span
      className={twMerge(
        joinTWClass(
          "w-full h-full",
          "flex justify-center items-center",
          "text-4xl text-white",
        ),
        className,
      )}
    >
      1/2
    </span>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function GameWinnerBannerOverlay({ ...a }) {
  const option = useSelector(
    (s) => s.component_data.chess_board.game_winner_banner_overlay,
  );
  const dispatch = useDispatch();
  useListen("SOCKET_GAME_DRAW_REQUEST_RECIVED", function (args) {
    if (args.payload.accept) {
      dispatch(
        updateGameWinnerBannerOverlay({
          display: true,
          draw: true,
          text: "Match Draw",
        }),
      );
      dispatch(setDataChessBoardGameState("end"));
    }
  });
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
      <BannerIconLayout>
        {(function () {
          if (option.draw) {
            return <DrawBanner />;
          }
          return <WinnerKing piece={option.piece} color={option.color} />;
        })()}
      </BannerIconLayout>
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
