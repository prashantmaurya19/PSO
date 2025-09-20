//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import {
  BlitzChessIcon,
  PawnIcon,
  RobotHeadIcon,
  SettingGearIcon,
  StopWatchIcon,
} from "@pso/components/icon/dashboard";
import { acache } from "@pso/util/cache";
import { pmlog } from "@pso/util/log";
import { TIME_DURATION_CATAGORIES } from "@pso/util/time";

/**
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function NewBotPlayMenuButon({ ...a }) {
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
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function NewGamePlayMenuButon({ ...a }) {
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
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function DirectPlayMenuButton({ ...a }) {
  let b_info = acache("LAST_GAME_DURATION").localstorage().get().json();
  if (b_info == undefined) {
    acache("LAST_GAME_DURATION")
      .localstorage()
      .set()
      .json(TIME_DURATION_CATAGORIES[3]);
    b_info = TIME_DURATION_CATAGORIES[3];
  }
  return (
    <IconStartUpMenuButton
      {...a}
      text={b_info.label}
      icon={
        b_info.type == "rapid" ? (
          <StopWatchIcon
            pathProp={{
              className: joinTWClass("fill-white"),
            }}
            className="fill-white"
          />
        ) : (
          <BlitzChessIcon
            pathProp={{
              className: joinTWClass("fill-white"),
            }}
            className="fill-white"
          />
        )
      }
    />
  );
}

/**
 * @param {{text:string,icon:import("react").JSX.Element} & import("@pso/util/jjsx").JSXProps} o
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
 * @param {{text:string} & import("@pso/util/jjsx").JSXProps} p0
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
