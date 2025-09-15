import { joinTWClass } from "@pso/util/tailwind";
import { useSelector } from "react-redux";
import { isUpperCase } from "@pso/util/astring";
import { FontAwesomeChessPiece } from "@pso/components/icon/fontawesome";
import { emit, Events } from "@pso/util/event";
import { EMPTY_FEN_CHAR, streamFenIndexInfo } from "@pso/util/chess";
import { ChessBoardCell, ChessBoardGrid } from "@pso/components/chess-arena/chess-board/board";
/**
 * @param {import("../../../util/jjsx").JSXProps} p
 */
export function RenderChessBoard({}) {
  const view_setting = useSelector((s) => s.component_data.chess_board.self);
  if (!view_setting.display) return <></>;
  const position = view_setting.position;
  return (
    <ChessBoardGrid>
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
    </ChessBoardGrid>
  );
}
