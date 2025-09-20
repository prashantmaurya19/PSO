//@ts-nocheck
import { setDataChessBoardPosition } from "@pso/store/feature/chess-data";
import { updateMoveListActiveIndex } from "@pso/store/feature/component-data";
import { travers } from "@pso/util/chess";
import { pmlog } from "@pso/util/log";
import { joinTWClass } from "@pso/util/tailwind";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
/**
 * @param {{text:string}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveRowData({ text = "", className, ...a }) {
  return (
    <td
      {...a}
      className={twMerge(
        joinTWClass("flex justify-start items-center", "cursor-pointer"),
        className,
      )}
    >
      {text}
    </td>
  );
}

/**
 * @param {{active_index:number,curr_index:number,total:number,index:number,left_move:string,right_move:string}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveRow({
  total,
  index,
  curr_index,
  active_index,
  left_move,
  right_move,
  className,
  ...a
}) {
  const endRef = useRef(null);
  const move_list = useSelector(
    (s) => s.component_data.move_list_panel.move_list,
  );
  const dispatch = useDispatch();
  const click_move = (e) => {
    const n = parseInt(e.currentTarget.getAttribute("move_index"));
    dispatch(updateMoveListActiveIndex(n));
    const info = travers(n, move_list);
    dispatch(setDataChessBoardPosition(info));
  };

  useEffect(() => {
    if (curr_index + 1 == total) {
      endRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [total]);
  return (
    <tr
      ref={endRef}
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full min-w-[15%]",
          "flex justify-center items-center",
          "*:text-white *:text-xl",
        ),
        className,
      )}
    >
      <td
        className={joinTWClass("w-[10%]", "flex justify-center items-center")}
      >
        {index}
      </td>
      <MoveRowData
        onClick={click_move}
        move_index={curr_index}
        text={left_move}
        className={joinTWClass(
          "w-[37%] pl-1",
          curr_index == active_index ? "bg-white/10" : "",
        )}
      />
      <td className={joinTWClass("mx-1")}>|</td>
      <MoveRowData
        onClick={click_move}
        move_index={curr_index + 1}
        text={right_move}
        className={joinTWClass(
          "justify-end grow-1",
          "pr-2",
          curr_index + 1 == active_index ? "bg-white/10" : "",
        )}
      />
    </tr>
  );
}

/**
 * @param {{active_index:number,table_data:Array<String>}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveListTable({
  active_index,
  table_data = [],
  className = "",
  ...a
}) {
  return (
    <table {...a} className={twMerge(joinTWClass("w-full h-[60%]"), className)}>
      <tbody
        className={joinTWClass(
          "w-full h-full",
          "flex flex-col justify-start items-center",
          "overflow-y-auto",
        )}
      >
        {(function (data) {
          const res = [];
          for (let i = 0; i < data.length; i += 2) {
            res.push(
              <MoveRow
                key={i}
                active_index={active_index}
                curr_index={i}
                total={data.length}
                index={res.length + 1}
                left_move={data[i]}
                right_move={data[i + 1]}
              />,
            );
          }
          return res;
        })(table_data)}
      </tbody>
    </table>
  );
}
