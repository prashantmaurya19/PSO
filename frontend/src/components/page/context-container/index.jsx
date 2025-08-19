import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";

/**
 * @param {import("../../../util/jjsx").JSXElement} p0
 */
export function ContextContainer({ children, className, ...a }) {
  return (
    <div {...a} className={twMerge(className, joinTWClass("h-full w-full"))}>
      {children}
    </div>
  );
}
