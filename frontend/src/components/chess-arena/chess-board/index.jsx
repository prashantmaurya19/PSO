import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { isUppercase } from "../../../util/astring";
import { FontAwesomeChessPiece } from "../../icon/fontawesome";
import { emit, Events } from "../../../util/event";
import { index2Move } from "../../../util/chess";

/**
 * @param {import("../../util/jjsx").JSXElement}
 */
function ChessBoardCell({ className = "", children, ...a }) {
  return (
    <span {...a} className={twMerge(className, joinTWClass("w-full h-full"))}>
      {children}
    </span>
  );
}

/**
 * @param {import("../../util/jjsx").JSXElement}
 */
export function ChessBoard({ className = "", ...a }) {
  const initialPosition = useSelector((s) => s.chess.chess_position);
  const rows = 8,
    cols = 8;
  const container = useRef();

  return (
    <div
      {...a}
      ref={container}
      className={twMerge(
        className,
        joinTWClass(
          "grid grid-cols-8 grid-rows-8",
          "w-full aspect-square",
          "border-1 border-solid border-emerald-200",
        ),
      )}
    >
      {(function () {
        const res = [];
        for (let i = 0, prog = 0; i < rows; i++) {
          for (let j = 0, empty_cell = 0; j < cols; j++) {
            let piece = null;
            if (empty_cell == 0) {
              const c = parseInt(initialPosition.charAt(prog));
              if (Number.isInteger(c)) {
                empty_cell = c;
              } else {
                piece = (
                  <div
                    data-piecename={initialPosition.charAt(prog)}
                    draggable
                    onDragStart={(e) => {
                      const ele =
                        e.target.children.length == 0
                          ? e.target.parentNode
                          : e.target;
                      container.current.draggedElement = ele;
                      ele.pmy = e.clientY;
                      ele.pmx = e.clientX;
                      e.stopPropagation();
                      e.stopPropagation();
                    }}
                    className="w-full h-full relative"
                  >
                    <FontAwesomeChessPiece
                      className={joinTWClass(
                        "cursor-grab",
                        "cursor-[-webkit-grab]",
                        "cursor-[-moz-grab]",
                        "block object-fill",
                        "absolute",
                        "w-full h-full",
                        "p-2",
                      )}
                      fenChar={initialPosition.charAt(prog)}
                      iconProps={{
                        style: {
                          color: isUppercase(initialPosition.charAt(prog))
                            ? "white"
                            : "black",
                        },
                      }}
                    />
                  </div>
                );
              }
              prog++;
            }
            res.push(
              <ChessBoardCell
                onDrop={(e) => {
                  const e_height = e.currentTarget.offsetHeight;
                  const e_width = e.currentTarget.offsetWidth;
                  const y = Math.floor(
                    (e.clientY - container.current.offsetTop) / e_height,
                  );
                  const x = Math.floor(
                    (e.clientX - container.current.offsetLeft) / e_width,
                  );
                  const nth_ele = container.current.children[y * 8 + x];
                  const draggedElement = container.current.draggedElement;
                  emit(Events.BOARD_MOVE_PLAYED, {
                    from: index2Move(
                      Math.floor(
                        (container.current.draggedElement.pmy -
                          container.current.offsetTop) /
                          e_height,
                      ),
                      Math.floor(
                        (container.current.draggedElement.pmx -
                          container.current.offsetLeft) /
                          e_width,
                      ),
                    ),
                    to: index2Move(x, y),
                  });
                  nth_ele.appendChild(draggedElement);
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                key={i * rows + j}
                className={
                  (i * rows + j) % 2 == i % 2 ? "bg-emerald-400" : "bg-gray-700"
                }
              >
                {piece}
              </ChessBoardCell>,
            );
            if (empty_cell > 0) empty_cell--;
          }
          prog++;
        }
        return res;
      })()}
    </div>
  );
}
