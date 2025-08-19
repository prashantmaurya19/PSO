import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../util/tailwind";

/**
 * @param {import("../../util/jjsx").JSXElement} p0
 */
export function NavElementSet({ className, children, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-max h-max",
          "relative",
          "flex justify-center items-center",
          "bg-transparent",
        ),
        className,
      )}
    >
      {children}
    </div>
  );
}
