import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../util/tailwind";
import { Avatar } from "../profile/avatar";
import { FontAwesomeChessPieceProvider } from "../../impl/chess_piece_providers";
import { PieceProvider } from "../../stereotype/piece_provider";
import { getFENCharToChessPieceELement } from "../../util/chess";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { isUppercase } from "../../util/astring";

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
 * @typedef {{chessPieceProvider:PieceProvider,flip:boolean,premove:boolean,initialPosition:string}} ChessBoardProps
 * @param {ChessBoardProps & import("../../util/jjsx").JSXElement}
 */
function ChessBoard({
  initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  chessPieceProvider = new FontAwesomeChessPieceProvider(),
  premove = false,
  flip = false,
  className,
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
                piece = getFENCharToChessPieceELement(
                  initialPosition.charAt(prog),
                  chessPieceProvider,
                  {
                    className: joinTWClass(
                      "cursor-grab",
                      "cursor-[-webkit-grab]",
                      "cursor-[-moz-grab]",
                      "block",
                    ),
                    draggable: "true",
                    onDragStart: (e) => {
                      const ele =
                        e.target.children.length == 0
                          ? e.target.parentNode
                          : e.target;
                      container.current.draggedElement = ele;
                      ele.pmy = e.clientY;
                      ele.pmx = e.clientX;
                      e.stopPropagation();
                      e.stopPropagation();
                    },
                    onDrag: (e) => {
                      let ele =
                        e.target.children.length == 0
                          ? e.target.parentNode
                          : e.target;
                      ele.style.transform = `translate(${e.clientX - ele.pmx}px,${e.clientY - ele.pmy}px)`;
                      e.preventDefault();
                      e.stopPropagation();
                    },
                  },
                  {
                    className: joinTWClass(
                      isUppercase(initialPosition.charAt(prog))
                        ? "fill-white"
                        : "fill-emerald-900",
                    ),
                  },
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
                  (i * rows + j) % 2 == i % 2
                    ? "bg-emerald-400"
                    : "bg-transparent"
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
          "max-w-[40%] w-max h-[80%]",
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
 * @param {{timeProps:import("../../util/jjsx").JSXElement}&import("../../util/jjsx").JSXElement}
 */
function SideInfoPanels({ timeProps = {}, className, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass("flex justify-between items-start grow-1", "w-full"),
        className,
      )}
    >
      <InfoPanel>
        <span
          className={joinTWClass("h-full aspect-square", "block", "relative")}
        >
          <Avatar className="absolute" />
        </span>
        <span className={joinTWClass("text-2xl text-white")}>prashant</span>
      </InfoPanel>
      <InfoPanel
        {...timeProps}
        className={twMerge(
          joinTWClass(
            "w-[30%]",
            "text-white text-5xl",
            "border-1 border-solid border-gray-500",
          ),
          timeProps.className,
        )}
      >
        1:00
      </InfoPanel>
    </div>
  );
}

/**
 * @typedef {{flipBoard:Function,stop:Function,start:Function}} ChessBoardControlObject
 * @param {ChessBoardProps} p
 */
export function ChessArena({ className, ...a }) {
  // const [player_turn, setTurn] = useState(true);
  // const [player_clock,setPlayerClock] = useState();
  const premove = useSelector((state) => state.settings.premove);
  const opponent_clock_element = useRef();
  const player_clock_element = useRef();
  // const start = () => {
  //   const clock_reduction_ele = player_turn
  //     ? player_clock_element
  //     : opponent_clock_element;
  //   const interval_id = setInterval(() => {}, 100);
  // };
  // const stop = () => {
  //   clearInterval(interval_id);
  // };
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
        timeProps={{ ref: opponent_clock_element }}
        className="items-end"
      />
      <ChessBoard premove={premove} {...a} />
      <SideInfoPanels timeProps={{ ref: player_clock_element }} />
    </div>
  );
}
