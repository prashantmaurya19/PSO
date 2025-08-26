import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";
import { ContextContainer } from "../../../components/page/context-container";

/**
 * @param {import("../../../util/jjsx").JSXElement} p0
 */
function GridCell({ className, children, ...a }) {
  return (
    <button
      {...a}
      className={twMerge(
        joinTWClass(
          "h-1/2 aspect-square ",
          "flex justify-center items-center",
          "border-1 border-solid border-gray-200",
          "text-white text-3xl",
          "transition-all",
          "hover:border-green-500",
          "hover:bg-green-500/5",
          "active:scale-[0.96]",
        ),
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * @param {import("../../../util/jjsx").JSXElement} param0
 */
function GridContainer({ className = "", children, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-[70%] aspect-[1.8]",
          "flex items-center justify-center flex-wrap gap-3",
          "p-7",
          "border-1 border-solid border-gray-300 rounded-[4px]",
        ),
      )}
    >
      {children}
    </div>
  );
}

/**
 * @param {import("../../../util/jjsx").JSXElement} param0
 */
export function GameDurationMenu({ className = "", ...opt }) {
  return (
    <ContextContainer
      {...opt}
      className={twMerge(
        className,
        joinTWClass(
          "flex justify-center items-center flex-col gap-7",
          "absolute",
        ),
      )}
    >
      <span className="w-[70%] text-white text-center text-3xl">Select Game Duration</span>
      <GridContainer>
        <GridCell>1 Min</GridCell>
        <GridCell>2 Min</GridCell>
        <GridCell>2+1 Min</GridCell>
        <GridCell>3 Min</GridCell>
        <GridCell>5 Min</GridCell>
        <GridCell>10 Min</GridCell>
      </GridContainer>
    </ContextContainer>
  );
}
