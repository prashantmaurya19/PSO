import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";

/**
 * @param {{text:string,textProps:import("@pso/util/jjsx").JSXProps,icon:import("@pso/util/jjsx").JSXProps} & import("@pso/util/jjsx").JSXProps} p0
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
