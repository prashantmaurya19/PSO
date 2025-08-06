import { join } from "../../util/tailwind";
import "react";
import React from "react";


function NavBar({ children }) {
  return (
    <nav
      className={join(
        "bg-bg/50 backdrop-blur-[3px]",
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
