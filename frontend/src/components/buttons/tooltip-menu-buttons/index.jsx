import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";

/**
 * @param {{text:string,textProps:import("../../../util/jjsx").JSXElement,icon:import("../../../util/jjsx").JSXElement} & import("../../../util/jjsx").JSXElement} p0
 */
export function ToolTipButton({
  textProps = {},
  className = "flex-1",
  text = "",
  icon,
  ...a
}) {
  return (
    <button
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full h-[5vh]",
          "flex justify-center items-center",
          "p-1.5",
          "active:scale-[0.96]","z-30"
        ),
        className,
      )}
    >
      {icon}
      <span
        {...textProps}
        className={twMerge(
          joinTWClass("flex-1 text-gray-100"),
          textProps.className,
        )}
      >
        {text}
      </span>
    </button>
  );
}
