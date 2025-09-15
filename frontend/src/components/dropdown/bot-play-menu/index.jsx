import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { DropDownButton } from "@pso/components/buttons/bot-play-menu";
import React, { useRef } from "react";
import { toggleJsxAtrribute } from "@pso/util/jjsx";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function DropDownItem({ className = "", children, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-full",
          "rounded-[3px]",
          "cursor-pointer",
          "p-2",
          "hover:bg-gray-800",
        ),
      )}
    >
      {children}
    </div>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps}
 */
function DropDownContent({ children, className = "", ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "absolute",
          "min-w-full max-h-[40vh]",
          "flex flex-col justify-start items-center",
          "text-index-second text-2xl",
          "p-2",
          "mt-1.5",
          "bg-white/5",
          "rounded-[4px]",
          "shadow-[2px_0_7px_1px_theme(color.index-second)]",
          "overflow-y-auto no-scrollbar",
          "opacity-0 hidden",
          "data-close:opacity-100",
          "data-close:block",
        ),
      )}
    >
      {children}
    </div>
  );
}

/**
 * @param {{itemList:Array.<string>,initSelect:number}&import("@pso/util/jjsx").JSXProps} p
 */
export function DropDownMenu({
  itemList = [],
  initSelect = 0,
  children,
  className = "",
  ...a
}) {
  const content_ele = useRef();
  const button_ele = useRef();
  const toggle = () => {
    toggleJsxAtrribute(button_ele.current, "data-close");
    toggleJsxAtrribute(content_ele.current, "data-close");
  };
  return (
    <div {...a} className={twMerge(className, joinTWClass("relative"))}>
      <DropDownButton
        className={"data-close:[&>span]:transform-[rotate(180deg)]"}
        ref={button_ele}
        onClick={() => {
          toggle();
        }}
      >
        {itemList[initSelect]}
      </DropDownButton>
      <DropDownContent ref={content_ele}>
        {(function () {
          const res = [];
          for (let i = 0; i < itemList.length; i++)
            res.push(
              <DropDownItem
                onClick={(e) => {
                  button_ele.current.firstChild.textContent =
                    e.target.innerText;
                  toggle();
                }}
                key={i}
              >
                {itemList[i]}
              </DropDownItem>,
            );

          return res;
        })()}
      </DropDownContent>
    </div>
  );
}
