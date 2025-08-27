import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";
import {
  BlitzChessIcon,
  PawnIcon,
  RobotHeadIcon,
  SettingGearIcon,
} from "../../icon/dashboard";

/**
 * @param {import("../../../util/jjsx").JSXElement} param0
 */
export function NewBotPlayMenuButon({...a}) {
  return (
    <IconStartUpMenuButton
      {...a}
      text="Bot Game"
      icon={
        <RobotHeadIcon
          pathProp={{
            className: joinTWClass("fill-white"),
          }}
          className="fill-white"
        />
      }
    />
  );
}

/**
 * @param {import("../../../util/jjsx").JSXElement} param0
 */
export function NewGamePlayMenuButon({...a}) {
  return (
    <IconStartUpMenuButton
      {...a}
      text="New Game"
      icon={
        <PawnIcon
          pathProp={{
            className: joinTWClass("fill-white"),
          }}
          className="fill-white"
        />
      }
    />
  );
}

/**
 * @param {import("../../../util/jjsx").JSXElement} param0
 */
export function BliztPlayMenuButton({...a}) {
  return (
    <IconStartUpMenuButton
      {...a}
      text="3 Min "
      icon={
        <BlitzChessIcon
          pathProp={{
            className: joinTWClass("fill-white"),
          }}
          className="fill-white"
        />
      }
    />
  );
}

/**
 * @param {{text:string,icon:import("react").JSX.Element} & import("../../../util/jjsx").JSXElement} o
 */
export function IconStartUpMenuButton({
  text = "Default",
  icon,
  className = "",
  ...opt
}) {
  return (
    <StartUpMenuRectButton
      {...opt}
      className={twMerge(joinTWClass("gap-4"), className)}
    >
      <span className={joinTWClass("w-[15%] aspect-square")}>{icon}</span>
      <span>{text}</span>
    </StartUpMenuRectButton>
  );
}

/**
 * @param {{text:string} & import("../../../util/jjsx").JSXElement} p0
 */
export function StartUpMenuRectButton({ children, className = "", ...opt }) {
  return (
    <button
      {...opt}
      className={twMerge(
        joinTWClass(
          "max-h-[7%] max-w-[20%]",
          "py-10 px-0",
          "flex items-center justify-center grow-1",
          "text-4xl",
          "border-1 border-solid rounded-[2px] border-amber-100",
          "transition-all",
          "*:**:transition-all",
          "text-white",
          "hover:border-index-third",
          "hover:shadow-[0_0_10px_2px_theme(colors.index-third)]",
          "hover:text-index-third",
          "hover:*:**:fill-green-500",
          "active:scale-[0.96]",
        ),
        className,
      )}
    >
      {children}
    </button>
  );
}
