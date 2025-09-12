import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { isUpperCase } from "../../../util/astring";
import { FontAwesomeChessPiece } from "../../icon/fontawesome";
import { emit, Events, useListen } from "../../../util/event";
import {
  EMPTY_FEN_CHAR,
  getPromotionFor,
  parse,
  pickPieceAt,
  PROMOTION_PIECES,
  putPieceAt,
  streamFenIndexInfo,
  stringify,
  transition,
} from "../../../util/chess";
import { setTurn, updatePosition } from "../../../store/feature/chess-data";
import { pmlog } from "../../../util/log";

/**
 * @param {import("../../util/jjsx").JSXElement} p
 */
function ChessBoardCell({ className = "", children, ...a }) {
  return (
    <span {...a} className={twMerge(className, joinTWClass("w-full h-full"))}>
      {children}
    </span>
  );
}

/**
 * @param {{flip:boolean,position:import("../../../util/chess").FenPiecePosition}&import("../../../util/jjsx").JSXElement} p
 */
function RenderChessBoard({ flip = false, position = "" }) {
  return (
    <div
      className={joinTWClass(
        "w-full h-full",
        "grid grid-cols-8 grid-rows-8",
        "absolute",
      )}
      key={0}
    >
      {streamFenIndexInfo(position, (j, i, piece) => {
        return (
          <ChessBoardCell
            onDrop={(e) => {
              const e_height = e.currentTarget.offsetHeight;
              const e_width = e.currentTarget.offsetWidth;
              const y = Math.floor(
                (e.clientY - e.currentTarget.parentNode.parentNode.offsetTop) /
                  e_height,
              );
              const x = Math.floor(
                (e.clientX - e.currentTarget.parentNode.parentNode.offsetLeft) /
                  e_width,
              );
              emit(Events.BOARD_MOVE_PLAYED, {
                to: [x, y],
                from: [
                  e.currentTarget.parentNode.pmx,
                  e.currentTarget.parentNode.pmy,
                ],
              });
              e.target.style.transform = "";
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            key={i * 8 + j}
            className={
              (i * 8 + j) % 2 == i % 2 ? "bg-emerald-400" : "bg-gray-700"
            }
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
                onDragStart={(e) => {
                  e.dataTransfer.setDragImage(
                    document.createElement("span"),
                    0,
                    0,
                  );
                  const e_height = e.currentTarget.offsetHeight;
                  const e_width = e.currentTarget.offsetWidth;
                  // e.currentTarget.parentNode.parentNode.pmclientX = e.clientX;
                  // e.currentTarget.parentNode.parentNode.pmclientY = e.clientY;
                  e.currentTarget.parentNode.parentNode.pmx = Math.floor(
                    (e.clientX -
                      e.currentTarget.parentNode.parentNode.parentNode
                        .offsetLeft) /
                      e_width,
                  );
                  e.currentTarget.parentNode.parentNode.pmy = Math.floor(
                    (e.clientY -
                      e.currentTarget.parentNode.parentNode.parentNode
                        .offsetTop) /
                      e_height,
                  );
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.parentNode.parentNode.pmclientY =
                    rect.top + rect.height / 2;
                  e.currentTarget.parentNode.parentNode.pmclientX =
                    rect.left + rect.width / 2;

                  e.stopPropagation();
                  e.stopPropagation();
                }}
                onDrag={(e) => {
                  const x = e.currentTarget.parentNode.parentNode.pmclientX;
                  const y = e.currentTarget.parentNode.parentNode.pmclientY;
                  e.currentTarget.style.transform = `translate(${e.clientX - x}px, ${e.clientY - y}px)`;
                }}
                fenChar={piece}
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
    </div>
  );
}

/**
 * @param {{flip:boolean,from:import("../../../util/chess").BoardCellIndex}&import("../../../util/jjsx").JSXElement} p
 */
export function PromotionPieceOverlay({
  flip = false,
  from = null,
  className = "",
  ...a
}) {
  if (from == null) return <></>;
  const motion = [0, 1];
  let to = from;
  /**
   * @type {import("../../../util/chess").BoardInfo}
   */
  const board_info = useSelector((s) => s.chess.chess_position);
  return (
    <div
      {...a}
      key={1}
      className={twMerge(
        className,
        joinTWClass(
          "w-full h-full",
          "grid grid-cols-8 grid-rows-8",
          "absolute",
        ),
      )}
    >
      {streamFenIndexInfo("", (j, i, piece) => {
        if (to[0] == j && to[1] == i && to[1] < from[1] + 4) {
          const ele = (
            <ChessBoardCell
              onClick={(e) => {
                pmlog(e.target.getAttribute("data-piecename"));
                emit("BOARD_PROMOTION_PIECE_SELECTED", {
                  selected_piece: e.target.getAttribute("data-piecename"),
                  index: from,
                });
              }}
              className={joinTWClass("bg-emerald-400")}
              key={i * 8 + j}
            >
              <FontAwesomeChessPiece
                className={joinTWClass(
                  "cursor-pointer",
                  "w-full h-full",
                  "bg-transparent",
                  "p-2",
                )}
                fenChar={
                  flip
                    ? PROMOTION_PIECES[to[1] - from[1]]
                    : PROMOTION_PIECES[to[1] - from[1]].toUpperCase()
                }
                iconProps={{
                  style: {
                    color: !flip ? "white" : "black",
                  },
                }}
              />
            </ChessBoardCell>
          );
          to = motion.map((v, i) => to[i] + v);
          return ele;
        }
        return (
          <ChessBoardCell
            className={joinTWClass("bg-transparent", "pointer-events-none")}
            key={i * 8 + j}
          ></ChessBoardCell>
        );
      })}
    </div>
  );
}

/**
 * @param {import("../../util/jjsx").JSXElement}
 */
export function ChessBoard({ className = "", ...a }) {
  const fen = useSelector((s) => s.chess.chess_position);
  const fen_info = parse(fen.fen);
  const this_player = useSelector((s) => s.chess.players_data);
  const initialPosition = parse(fen.fen);
  const flip = this_player.p.side == "b";
  const dispatch = useDispatch();
  useListen("BOARD_MOVE_PLAYED", (e) => {
    const t = transition(e.from, e.to, fen);
    dispatch(updatePosition(t.board_info));
    dispatch(setTurn(parse(t.board_info.fen).color));
  });

  useListen("BOARD_PROMOTION_PIECE_SELECTED", (e) => {
    // const info = parse(fen.fen);
    fen_info.position = putPieceAt(
      e.selected_piece,
      ...e.index,
      fen_info.position,
    );
    dispatch(
      updatePosition({
        ...fen,
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
      <RenderChessBoard flip={flip} position={initialPosition.position} />
      <PromotionPieceOverlay
        flip={flip}
        from={getPromotionFor(this_player.p.side, fen_info.position)}
        // from={[2, 0]}
      />
    </div>
  );
}
