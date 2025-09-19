//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { joinTWClass } from "@pso/util/tailwind";
import { isUpperCase } from "@pso/util/astring";
import { FontAwesomeChessPiece } from "@pso/components/icon/fontawesome";
import { emit, useListen } from "@pso/util/event";
import { useDispatch, useSelector } from "react-redux";
import {
  CHESS_NOTATION_CHECKMATE_CHAR,
  ChessEventHandler,
  ChessNotation,
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
import { clone } from "@pso/util/aobject";
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

const onDrag = (e) => {
  const x = e.currentTarget.parentNode.parentNode.pmclientX;
  const y = e.currentTarget.parentNode.parentNode.pmclientY;
  e.currentTarget.style.transform = `translate(${e.clientX - x}px, ${e.clientY - y}px)`;
};
const onDragStart = (e) => {
  e.dataTransfer.setDragImage(document.createElement("span"), 0, 0);
  const e_height = e.currentTarget.offsetHeight;
  const e_width = e.currentTarget.offsetWidth;
  e.currentTarget.parentNode.parentNode.pmx = parseInt(
    e.currentTarget.getAttribute("data-col"),
  );
  e.currentTarget.parentNode.parentNode.pmy = parseInt(
    e.currentTarget.getAttribute("data-row"),
  );
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.parentNode.parentNode.pmclientY = rect.top + rect.height / 2;
  e.currentTarget.parentNode.parentNode.pmclientX = rect.left + rect.width / 2;

  e.stopPropagation();
  e.stopPropagation();
};
const onDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const onDrop = (e) => {
  const e_rect = e.currentTarget.getBoundingClientRect();
  const e_height = e_rect.height;
  const e_width = e_rect.width;
  const p_rect = e.currentTarget.parentNode.parentNode.getBoundingClientRect();
  const y = Math.floor((e.clientY - p_rect.y) / e_height);
  const x = Math.floor((e.clientX - p_rect.x) / e_width);
  emit("BOARD_MOVE_PLAYED", {
    to: [x, y],
    from: [e.currentTarget.parentNode.pmx, e.currentTarget.parentNode.pmy],
  });
  e.target.style.transform = "";
  e.preventDefault();
  e.stopPropagation();
};
/**
 * @param {import("../../../util/jjsx").JSXProps} p
 */
export function RenderChessBoard({}) {
  const state = useSelector((s) => s.chess.game_state);
  const player_info = useSelector((s) => s.chess.players_data);
  const promotion_notation = useSelector((s) => s.chess.promotion_notation);
  const fen = useSelector((s) => s.chess.chess_position);
  const fen_info = parse(fen.fen);
  const dispatch = useDispatch();
  const view_setting = useSelector((s) => s.component_data.chess_board.self);
  if (!view_setting.display) return <></>;
  const position = view_setting.position;
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
  useListen("BOARD_MOVE_PLAYED", (e) => {
    const t = transition(e.from, e.to, fen);
    if (t.cancel) return;
    const next_info = parse(t.board_info.fen);
    dispatch(setDataChessBoardPosition(t.board_info));
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
  useListen("SOCKET_GAME_EVENT_RECIVED", (e) => {
    pmlog(e);
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
            onDrop={onDrop}
            onDragOver={onDragOver}
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
                onDragStart={onDragStart}
                onDrag={onDrag}
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
