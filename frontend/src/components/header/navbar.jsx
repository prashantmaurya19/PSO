import { joinTWClass } from "../../util/tailwind";
import "react";
import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * @param {import("react").HTMLProps & import("react").HTMLAttributes} param0
 */
function NavBar({ className = "", children, ...a }) {
  return (
    <nav
      {...a}
      className={twMerge(
        joinTWClass(
          "bg-transparent backdrop-blur-[3px]",
          "flex justify-between flex-row",
          "h-[var(--nav-height)] w-full",
          "text-index-second",
        ),
        className,
      )}
    >
      <span className="flex w-[30%] h-full">
        <span className="block bg-index-third h-[150%] aspect-square rounded-[50%] translate-x-[-30%] translate-y-[-40%]"></span>
        <p className="text-[26px] block ml-[-28px] z-10">Chess.com</p>
      </span>
      <span
        className={joinTWClass(
          "pt-[2px] pr-[5px] pb-0 pl-[5px]",
          "h-full w-1/2",
          "flex justify-end gap-1.5",
        )}
      >
        {children}
      </span>
    </nav>
  );
}

export default NavBar;
