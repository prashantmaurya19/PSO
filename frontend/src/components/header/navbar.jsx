import { join } from "../../util/tailwind";
import "react";
import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

/**
 * @param {{ className:string,to:string }}
 */
export const NavButton = ({ className = "", to = "#", children }) => {
  return (
    <Link
      to={to}
      className={twMerge(
        join(
          "no-underline",
          "font-[inherit]",
          "w-[100px] h-[90%]",
          "ml-2",
          "rounded-3xl",
          "text-index-second",
          "border-1 border-index-second border-solid",
          "bg-linear-[0deg,theme(colors.index-primary)_50%,theme(colors.index.second)_50%]",
          "bg-size-[100%_200%]",
          "bg-position-[0_100%]",
          "transition-background duration-75 ease-in-out",
          "flex items-center justify-center",
          "hover:text-index-primary",
          "hover:bg-position-[0_0%]",
        ),
        className,
      )}
    >
      {children}
    </Link>
  );
};

function NavBar({ children }) {
  return (
    <nav
      className={join("bg-bg/50 backdrop-blur-[3px]",
        "flex justify-between flex-row",
        "h-[var(--nav-height)] w-full",
        "text-index-second",
      )}
    >
      <span className="flex w-[30%] h-full">
        <span className="block bg-index-third h-[150%] aspect-square rounded-[50%] translate-x-[-30%] translate-y-[-40%]"></span>
        <p className="text-[26px] block ml-[-28px] z-10">Shogi.com</p>
      </span>
      <span
        className={join(
          "pt-[2px] pr-[5px] pb-0 pl-[2px]",
          "h-full w-1/2",
          "flex justify-end",
        )}
      >
        {children}
      </span>
    </nav>
  );
}

export default NavBar;
