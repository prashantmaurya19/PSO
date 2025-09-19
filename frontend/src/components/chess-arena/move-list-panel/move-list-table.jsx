//@ts-nocheck
import { joinTWClass } from "@pso/util/tailwind";
import { twMerge } from "tailwind-merge";
/**
 * @param {{text:string}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveRowData({ text = "", className, ...a }) {
  return (
    <td
      {...a}
      className={twMerge(
        joinTWClass("flex justify-start items-center"),
        className,
      )}
    >
      {text}
    </td>
  );
}

/**
 * @param {{index:number,left_move:string,right_move:string}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveRow({ index, left_move, right_move, className, ...a }) {
  return (
    <tr
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
      <MoveRowData text={left_move} className="w-[37%] pl-1" />
      <td className="mx-1">|</td>
      <MoveRowData
        text={right_move}
        className={joinTWClass("justify-end grow-1", "pr-2")}
      />
    </tr>
  );
}

/**
 * @param {{table_data:Array<String>}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveListTable({ table_data = [], className = "", ...a }) {
  return (
    <table {...a} className={twMerge(joinTWClass("w-full h-[70%]"), className)}>
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
