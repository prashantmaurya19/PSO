//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { useListen } from "@pso/util/event";
import {
  getPromotionFor,
  parse,
  putPieceAt,
  stringify,
  transition,
} from "@pso/util/chess";
import { setDataChessBoardTurn, setDataChessBoardPosition } from "@pso/store/feature/chess-data";
import { clone } from "@pso/util/aobject";
import {
  updateChessBoard,
  updateChessBoardFindOponentLoader,
  updatePromotionPieceOverlay,
} from "@pso/store/feature/component-data";
import { PromotionPieceOverlay } from "@pso/components/chess-arena/chess-board/promotion-piece-overlay";
import { RenderChessBoard } from "@pso/components/chess-arena/chess-board/piece-render";
import { FindOponentLoader } from "@pso/components/loader/chess-board";
import { useEffect } from "react";

/**
 * @param {import("@pso/util/jjsx").JSXProps}
 */
export function ChessBoard({ className = "", ...a }) {
  const fen = useSelector((s) => s.chess.chess_position);
  const fen_info = parse(fen.fen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateChessBoard({ display: true, position: fen_info.position }));
    dispatch(
      updatePromotionPieceOverlay({
        display: true,
        promotion_index: getPromotionFor(fen_info.color, fen_info.position),
      }),
    );
  }, [fen]);
  useListen("BOARD_MOVE_PLAYED", (e) => {
    const t = transition(e.from, e.to, fen);
    const next_info = parse(t.board_info.fen);
    dispatch(setDataChessBoardPosition(t.board_info));
    dispatch(setDataChessBoardTurn(next_info.color));
  });
  useListen("BOARD_PROMOTION_PIECE_SELECTED", (e) => {
    fen_info.position = putPieceAt(
      e.selected_piece,
      ...e.index,
      fen_info.position,
    );
    dispatch(
      setDataChessBoardPosition({
        kings: clone(fen.kings),
        fen: stringify(fen_info),
      }),
    );
  });

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
    </div>
  );
}
