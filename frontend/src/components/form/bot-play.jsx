import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../util/tailwind";
import { DropDownMenu } from "../dropdown/bot-play-menu";
import { useRef } from "react";
import { PawnIcon } from "../icon/dashboard";
import { BotPlayFormSubmitButton } from "../buttons/bot-play-menu";

/**
 * @param {{radioProps:import("../../util/jjsx").JSXElement,iconProps:import("../icon").IconProps} & import("../../util/jjsx").JSXElement} p
 */
function BlackAndWhiteCheckBox({
  radioProps = {},
  iconProps = {},
  className,
  ...a
}) {
  return (
    <span
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "aspect-square h-[90%]",
          "border-1 border-solid border-gray-500",
          "rounded-2xl",
          "overflow-hidden",
          "relative",
          "transition-all",
          "active:scale-[0.96]",
          "has-checked:border-3",
          "has-checked:border-index-third",
          "hover:shadow-[0_0_7px_1px]",
        ),
      )}
    >
      <PawnIcon
        {...iconProps}
        className={twMerge(iconProps.className, "absolute")}
      />
      <input
        {...radioProps}
        className="absolute w-full h-full opacity-0"
        type="radio"
        name="BlackAndWhiteSideSelection"
      />
    </span>
  );
}

/**
 * @param {import("../../util/jjsx").JSXElement} p
 */
function BlackAndWhiteSideSelection({ className = "", ...a }) {
  return (
    <fieldset
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-[40%] h-[10%]",
          "flex justify-around items-center flex-row",
        ),
      )}
    >
      <BlackAndWhiteCheckBox
        radioProps={{ value: "b" }}
        iconProps={{
          pathProp: { className: joinTWClass("fill-black") },
        }}
        className={joinTWClass("bg-white/20", "shadow-gray-700")}
      />
      <BlackAndWhiteCheckBox
        radioProps={{ value: "bw" }}
        className={joinTWClass("shadow-gray-700")}
      />
      <BlackAndWhiteCheckBox
        radioProps={{ value: "w", defaultChecked: true }}
        iconProps={{
          pathProp: { className: joinTWClass("fill-white") },
        }}
        className={joinTWClass("shadow-gray-700")}
      />
    </fieldset>
  );
}

/**
 * @param {{maxValue:number,minValue:number}&import("../../util/jjsx").JSXElement}
 */
function RangeSlider({
  defaultValue = 10,
  maxValue = 100,
  minValue = 0,
  className = "",
  ...a
}) {
  const display_ele = useRef();
  return (
    <div
      className={joinTWClass(
        "text-index-second",
        "w-[40%] h-[5%]",
        "flex justify-center items-center gap-3",
        "px-2",
        "text-2xl",
      )}
    >
      <span className="grow-1">Elo</span>
      <input
        {...a}
        onChange={(e) => {
          display_ele.current.innerText = e.target.value;
          e.target.value = e.target.value;
        }}
        defaultValue={defaultValue}
        className={twMerge(className, "w-[90%] h-full")}
        type="range"
      />
      <span className="grow-1" ref={display_ele}>
        {defaultValue}
      </span>
    </div>
  );
}

/**
 * @param {import("../../util/jjsx").JSXElement} p
 */
function BotIconBanner({ className = "", ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-[10%] aspect-square",
          "border-1 border-solid border-gray-200",
          "bg-linear-0 from-pink-500 to-red-600",
        ),
      )}
    ></div>
  );
}

/**
 * @param {import("../../util/jjsx").JSXElement} p
 */
export function BotPlayForm({ className = "", ...a }) {
  // fetch data for available engine
  const engines = ["StockFish", "Leela"];
  const side_slection_ele = useRef();
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-[90%] h-[95%]",
          "flex justify-center items-center flex-col gap-7",
          "p-2",
          "debug",
        ),
      )}
    >
      <BotIconBanner />
      <DropDownMenu itemList={engines} />
      <RangeSlider />
      <BlackAndWhiteSideSelection ref={side_slection_ele} />
      <BotPlayFormSubmitButton
        onClick={() => {
          console.log(side_slection_ele.current.querySelector("input:checked").value);
        }}
      >
        Play
      </BotPlayFormSubmitButton>
    </div>
  );
}
