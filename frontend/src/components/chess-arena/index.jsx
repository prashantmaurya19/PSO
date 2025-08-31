import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../util/tailwind";
import { Avatar } from "../profile/avatar";
import { FontAwesomeChessPieceProvider } from "../../impl/chess_piece_providers";
import { PieceProvider } from "../../stereotype/piece_provider";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { isUppercase } from "../../util/astring";
import { FontAwesomeChessPiece } from "../icon/fontawesome";
import { formatMiliSeconds, min2ms } from "../../util/time";

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
 * @typedef {{flip:boolean,initialPosition:string}} ChessBoardProps
 * @param {ChessBoardProps & import("../../util/jjsx").JSXElement}
 */
function ChessBoard({
  initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  flip = false,
  className,
  onMovePlayed = null,
  onPieceClick = null,
  ...a
}) {
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
                    draggable
                    onDrag={(e) => {
                      // let ele =
                      //   e.target.children.length == 0
                      //     ? e.target.parentNode
                      //     : e.target;
                      // ele.style.transform = `translate(${e.clientX - ele.pmx}px,${e.clientY - ele.pmy}px)`;
                      e.preventDefault();
                      e.stopPropagation();
                    }}
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
                        // "cursor-[-webkit-grab]",
                        // "cursor-[-moz-grab]",
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
                  const nth_ele =
                    container.current.children[
                      Math.floor(
                        (e.clientY - container.current.offsetTop) / e_height,
                      ) *
                        8 +
                        Math.floor(
                          (e.clientX - container.current.offsetLeft) / e_width,
                        )
                    ];
                  const draggedElement = container.current.draggedElement;
                  nth_ele.appendChild(draggedElement);
                  draggedElement.id = "";
                  draggedElement.style.transform = "";
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

/**
 * @param {import("../../util/jjsx").JSXElement}
 */
function InfoPanel({ className, children, ...a }) {
  return (
    <span
      {...a}
      className={twMerge(
        joinTWClass(
          "w-max h-[80%]",
          "px-3",
          "flex justify-center items-center gap-4",
        ),
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * @param {{text:string,clockTime:number,timeProps:import("../../util/jjsx").JSXElement}&import("../../util/jjsx").JSXElement}
 */
function SideInfoPanels({
  text = "player (xyz)",
  clockTime = 0,
  timeProps = {},
  className,
  ...a
}) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass("flex justify-between items-start grow-1", "w-full"),
        className,
      )}
    >
      <InfoPanel className="items-start py-1">
        <span
          className={joinTWClass("h-full aspect-square", "block", "relative")}
        >
          <Avatar className="absolute" />
        </span>
        <span className={joinTWClass("text-2xl text-white")}>{text}</span>
      </InfoPanel>
      <InfoPanel
        {...timeProps}
        className={twMerge(
          joinTWClass(
            "min-w-[30%] w-[20%]",
            "text-white text-5xl",
            "border-1 border-solid border-gray-500",
          ),
          timeProps.className,
        )}
      >
        {formatMiliSeconds(clockTime)}
      </InfoPanel>
    </div>
  );
}

/**
 * @typedef {{flipBoard:Function,stop:Function,start:Function}} ChessBoardControlObject
 * @param {ChessBoardProps} p
 */
export function ChessArena({ className, ...a }) {
  const [refresh, setRefresh] = useState(0);
  const premove = useSelector((state) => state.settings.premove);
  const opponent_clock_element = useRef();
  const player_clock_element = useRef();
  // setTimeout(() => {
  //   setRefresh(refresh + 1);
  //   console.log(refresh);
  // }, 1000);
  /*
   * for user information - text(username + rating) - clockTime in ms
   * */
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-full h-full",
          "flex justify-center items-center flex-col",
          // "relative",
        ),
      )}
    >
      <SideInfoPanels
        text="prashant (1899)"
        clockTime={min2ms(1.24)}
        timeProps={{ ref: opponent_clock_element }}
        className="items-end"
      />
      <ChessBoard premove={premove} {...a} />
      <SideInfoPanels
        text="nishant (1899)"
        clockTime={min2ms(0.04)}
        timeProps={{ ref: player_clock_element }}
      />
    </div>
  );
}
