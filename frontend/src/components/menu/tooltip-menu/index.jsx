import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";

/**
 * @param {import("react").HTMLProps & import("react").HTMLAttributes}
 */
export function ToolTipMenu({ children, className = "", ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-max min-w-[30vh]",
          "h-max min-h-[20vh]",
          "rounded-2xl",
	  "flex justify-star items-center flex-col gap-1",
	  "p-3"
        ),
        className,
      )}
    >
      {children}
    </div>
  );
}
