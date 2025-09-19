//@ts-nocheck
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconWraper } from "@pso/components/icon";
import { joinTWClass } from "@pso/util/tailwind";
import { twMerge } from "tailwind-merge";
/**
 * @param {{icon:import("react").FC<import("@pso/util/jjsx").JSXProps>,text:string}&import("@pso/util/jjsx").JSXProps} p
 */
export function MoveListButton({
  icon = null,
  text = "no text",
  className,
  ...a
}) {
  return (
    <button
      {...a}
      className={twMerge(
        joinTWClass(
          "grow-1 h-full",
          "flex justify-center items-center gap-2",
          "text-white",
          "transition-[background]",
          "bg-gray-600/30",
          "hover:bg-gray-600/70",
          "active:scale-[0.96]",
        ),
        className,
      )}
    >
      {icon}
      {text}
    </button>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function MoveListFunctionButtons({ className, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full h-[10%]",
          "flex justify-around items-center",
          "debug",
        ),
        className,
      )}
    >
      <MoveListButton text="1/2 Draw" />
      <MoveListButton
        icon={
          <IconWraper className="h-[70%] aspect-square">
            <FontAwesomeIcon
              icon={faFlag}
              rotation={315}
              style={{ color: "#ffffff" }}
            />
          </IconWraper>
        }
        text="Resign"
      />
    </div>
  );
}
