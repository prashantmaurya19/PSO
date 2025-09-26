//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { joinTWClass } from "@pso/util/tailwind";
import { isUpperCase, reverse } from "@pso/util/astring";
import { FontAwesomeChessPiece } from "@pso/components/icon/fontawesome";
import { emit, useListen } from "@pso/util/event";
import { useDispatch, useSelector } from "react-redux";
import {
  CHESS_NOTATION_CHECKMATE_CHAR,
  ChessEventHandler,
  ChessNotation,
  getPieceAt,
  getPromotionFor,
  parse,
  putPieceAt,
  stringify,
  toggleColor,
  transition,
} from "@pso/util/chess";
import {
  setDataChessBoardTurn,
  setDataChessBoardPosition,
  setDataChessBoardLastNotation,
  setDataChessBoardGameState,
} from "@pso/store/feature/chess-data";
import { clone, combine } from "@pso/util/aobject";
import {
  pushChessNotationToMoveList,
  updateChessBoard,
  updateChessBoardFindOponentLoader,
  updateGameWinnerBannerOverlay,
  updatePromotionPieceOverlay,
} from "@pso/store/feature/component-data";
import {
  EMPTY_FEN_CHAR,
  getColor,
  IndexCoordinator,
  streamFenIndexInfo,
} from "@pso/util/chess";
import {
  ChessBoardCell,
  ChessBoardGrid,
} from "@pso/components/chess-arena/chess-board/board";
import { pmlog } from "@pso/util/log";
import { RenderChessBoardEventHandler } from "@pso/listeners/piece-render-listeners";
import { sendGameEvent } from "@pso/util/socket";
import { RESULT } from "@pso/var-data/initialization-data";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function RenderChessBoard({}) {
  const view_setting = useSelector((s) => s.component_data.chess_board.self);
  if (!view_setting.display) return <></>;
  const dispatch = useDispatch();
  const state = useSelector((s) => s.chess.game_state);
  const player_info = useSelector((s) => s.chess.players_data);
  const promotion_notation = useSelector((s) => s.chess.promotion_notation);
  const fen = useSelector((s) => s.chess.chess_position);
  const flip = useSelector((s) => s.chess.flip);
  const turn = useSelector((s) => s.chess.turn);
  const fen_info = parse(fen.fen);
  const position = flip ? reverse(fen_info.position) : fen_info.position;
  useEffect(() => {
    dispatch(updateChessBoard({ display: true, position: fen_info.position }));
    dispatch(
      updatePromotionPieceOverlay({
        display: true,
        promotion_index: getPromotionFor(
          toggleColor(fen_info.color),
          fen_info.position,
        ),
      }),
    );
  }, [fen]);
  useListen("PHYSICAL_BOARD_MOVE_PLAYED", (e) => {
    if (flip) {
      e.from = IndexCoordinator.flipBoardCellIndex(e.from);
      e.to = IndexCoordinator.flipBoardCellIndex(e.to);
    }
    emit("BOARD_MOVE_PLAYED", e);
    if (!e.t.cancel)
      sendGameEvent(
        combine(RESULT.post_info, {
          action: "move_played",
          payload: JSON.stringify({ notation: e.t.chess_notation }),
        }),
      );
  });
  useListen("BOARD_MOVE_PLAYED", (e) => {
    pmlog(e);
    const t = transition(e.from, e.to, fen);
    e.t = t;
    if (t.cancel) return;
    const next_info = parse(t.board_info.fen);
    dispatch(setDataChessBoardPosition(t.board_info));
    dispatch(updateChessBoard({ info: t.board_info }));
    dispatch(setDataChessBoardTurn(next_info.color));
    if (!getPromotionFor(fen_info.color, next_info.position)) {
      dispatch(pushChessNotationToMoveList(t.chess_notation));
    } else {
      dispatch(setDataChessBoardLastNotation(t.chess_notation));
    }
    if (
      t.chess_notation.charAt(t.chess_notation.length - 1) ==
      CHESS_NOTATION_CHECKMATE_CHAR
    ) {
      emit("GAME_ENDED", {});
      dispatch(setDataChessBoardGameState("end"));
    }
  });
  useListen("GAME_ENDED", (e) => {
    dispatch(
      updateGameWinnerBannerOverlay({
        display: true,
        color: fen_info.color,
        piece: fen_info.color == "b" ? "k" : "K",
        text: `${fen_info.color == player_info.p.side ? "You" : "Oponent"} win by ChessMate`,
      }),
    );
  });
  useListen("TEST", (e) => {
    if (state != "playing") dispatch(setDataChessBoardGameState("playing"));

    emit("BOARD_MOVE_PLAYED", {
      socker: true,
      ...ChessNotation.enrichedParse(e.test.move, fen_info),
    });
  });
  useListen("BOARD_PROMOTION_PIECE_SELECTED", (e) => {
    fen_info.position = putPieceAt(
      e.selected_piece,
      ...e.index,
      fen_info.position,
    );
    dispatch(
      pushChessNotationToMoveList(
        ChessNotation.getChessNotationWithPromotion(
          promotion_notation,
          e.selected_piece,
          ChessEventHandler.getCheckAndCheckmateInfo(fen_info, fen.kings),
        ),
      ),
    );
    dispatch(
      setDataChessBoardPosition({
        kings: clone(fen.kings),
        fen: stringify(fen_info),
      }),
    );
  });
  return (
    <ChessBoardGrid>
      {streamFenIndexInfo(position, (j, i, piece) => {
        return (
          <ChessBoardCell
            onDrop={RenderChessBoardEventHandler.onDrop}
            onDragOver={RenderChessBoardEventHandler.onDragOver}
            key={IndexCoordinator.flatTwoDimensionalIndex(j, i)}
            className={joinTWClass(
              IndexCoordinator.flatTwoDimensionalIndex(j, i) % 2 == i % 2
                ? "bg-emerald-400"
                : "bg-gray-700",
              player_info.p.side != getColor(piece)
                ? "pointer-events-none"
                : "",
            )}
          >
            {piece == EMPTY_FEN_CHAR ? null : (
              <FontAwesomeChessPiece
                className={joinTWClass(
                  "cursor-grab",
                  "cursor-[-webkit-grab]",
                  "cursor-[-moz-grab]",
                  "w-full h-full",
                  "bg-transparent",
                  "p-2",
                )}
                onDragStart={RenderChessBoardEventHandler.onDragStart}
                onDrag={RenderChessBoardEventHandler.onDrag}
                fenChar={piece}
                data-row={i}
                data-col={j}
                iconProps={{
                  style: {
                    color: isUpperCase(piece) ? "white" : "black",
                  },
                }}
              />
            )}
          </ChessBoardCell>
        );
      })}
    </ChessBoardGrid>
  );
}
