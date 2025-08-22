import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";

/**
 * @param {{avatar:import("react").HTMLProps & import("react").HTMLAttributes} & import("react").HTMLProps & import("react").HTMLAttributes} p0
 */
export function BubbleButton({ children, className = "", ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "rounded-[50%]",
          "flex justify-center items-center",
          "active:scale-[0.96]",
          "**:pointer-events-none",
        ),
        className,
      )}
    >
      {children}
    </div>
  );
}
