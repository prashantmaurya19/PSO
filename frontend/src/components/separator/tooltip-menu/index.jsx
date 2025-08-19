import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";

/**
 * @param {{lineProp:import("../../../util/jjsx").JSXElement} &import("../../../util/jjsx").JSXElement} param0
 */
export function ToolTipSolidSeparator({ lineProp = {}, className = "", ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full h-[10%]",
          "flex justify-center items-center",
          "p-2",
        ),
        className,
      )}
    >
      <span
        {...lineProp}
	className={twMerge(
	  joinTWClass("h-[2px] w-full", "bg-white"),
	  lineProp.className,
	)}
      ></span>
    </div>
  );
}
