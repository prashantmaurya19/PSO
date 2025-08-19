import { twMerge } from "tailwind-merge";
import { ContextContainer } from "../../../components/page/context-container";
import { joinTWClass } from "../../../util/tailwind";

/**
 * @param {import("../../../util/jjsx").JSXElement} p0
 */
export function ChessPlayGround({ className = "", ...a }) {
  return (
    <ContextContainer
      {...a}
      className={twMerge(
        joinTWClass(
          "flex",
          "justify-center",
          "items-center",
          "absolute",
          "opacity-0 z-0",
          "data-subview:opacity-100",
          "data-subview:z-500",
        ),
        className,
      )}
    >
      <span className="text-white text-2xl font-DM_Sans">blank</span>
    </ContextContainer>
  );
}
