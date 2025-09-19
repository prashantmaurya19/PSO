//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { emit, useListen } from "@pso/util/event";
import { PromotionPieceOverlay } from "@pso/components/chess-arena/chess-board/promotion-piece-overlay";
import { RenderChessBoard } from "@pso/components/chess-arena/chess-board/piece-render";
import { FindOponentLoader } from "@pso/components/loader/chess-board";
import { useEffect } from "react";
import { pmlog } from "@pso/util/log";
import { GameWinnerBannerOverlay } from "./winner-banner-overlay";

/**
 * @param {import("@pso/util/jjsx").JSXProps}
 */
export function ChessBoard({ className = "", ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-full aspect-square",
          "border-1 border-solid border-emerald-200",
          "relative",
        ),
      )}
    >
      <RenderChessBoard />
      <PromotionPieceOverlay />
      <FindOponentLoader />
      <GameWinnerBannerOverlay />
    </div>
  );
}
