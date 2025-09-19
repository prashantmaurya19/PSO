import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function ChessBoardCell({ className = "", children, ...a }) {
  return (
    <span {...a} className={twMerge(className, joinTWClass("w-full h-full"))}>
      {children}
    </span>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function ChessBoardGrid({ className = "", children, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full h-full",
          "grid grid-cols-8 grid-rows-8",
          "absolute",
        ),
        className,
      )}
    >
      {children}
    </div>
  );
}
