import { joinTWClass } from "@pso/util/tailwind";
import { useSelector } from "react-redux";
import { FontAwesomeChessPiece } from "@pso/components/icon/fontawesome";
import { emit } from "@pso/util/event";
import {
  IndexCoordinator,
  PROMOTION_PIECES,
  streamFenIndexInfo,
} from "@pso/util/chess";
import { pmlog } from "@pso/util/log";
import { ChessBoardCell, ChessBoardGrid } from "@pso/components/chess-arena/chess-board/board";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 *
 */
export function PromotionPieceOverlay({ className = "", ...a }) {
  const view_setting = useSelector(
    (s) => s.component_data.chess_board.promotion_piece_overlay,
  );
  if (view_setting.promotion_index == null || !view_setting.display)
    return <></>;
  const motion = [0, 1];
  const from = view_setting.promotion_index;
  const flip = false;
  let to = from;
  return (
    <ChessBoardGrid>
      {streamFenIndexInfo("", (j, i, _) => {
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
              key={IndexCoordinator.flatTwoDimensionalIndex(j, i)}
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
            key={IndexCoordinator.flatTwoDimensionalIndex(j, i)}
          ></ChessBoardCell>
        );
      })}
    </ChessBoardGrid>
  );
}
