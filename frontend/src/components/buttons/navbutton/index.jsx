import { joinTWClass } from "../../../util/tailwind";
import "react";
import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * @param {{text:string} & NavButtonProps} param0
 */
export function SignUpButton({ className = "", text = "demo", ...opt }) {
  return (
    <NavButton
      {...opt}
      className={twMerge(
        joinTWClass(
          "border-index-forth",
          "bg-linear-0",
          "from-index-primary from-50%",
          "to-index-forth to-50%",
          "text-index-forth",
          "hover:text-index-second",
          "overflow-hidden",
          "text-index-forth",
        ),
        className,
      )}
    >
      {text}
    </NavButton>
  );
}

/**
 * @param {{text:string} & NavButtonProps} param0
 */
export function LoginButton({ className, text = "demo", ...opt }) {
  return (
    <NavButton
      {...opt}
      className={twMerge(
        joinTWClass(
          "border-index-third",
          "bg-linear-0",
          "from-index-primary from-50%",
          "to-index-third to-50%",
          "text-index-third",
          "hover:text-index-second",
          "overflow-hidden",
          "text-index-third",
        ),
        className,
      )}
    >
      {text}
    </NavButton>
  );
}

/**
 * @typedef {import("../../../util/jjsx").JSXElement} NavButtonProps
 */

/**
 * @param {NavButtonProps} p0
 */
export const NavButton = ({ className = "", to = "#", children, ...rest }) => {
  return (
    <a
      {...rest}
      className={twMerge(
        joinTWClass(
          "no-underline",
          "font-[inherit]",
          "aspect-[3/1] h-full",
          "ml-2",
          "rounded-3xl",
          "text-index-second",
          "border-1 border-index-second border-solid",
          "bg-linear-0",
          "from-index-primary from-50%",
          "to-index-second to-50% ",
          "bg-size-[100%_200%]",
          "bg-position-[0_100%]",
          "cursor-default",
          "transition-background duration-75 ease-in-out",
          "flex items-center justify-center",
          "hover:text-index-primary",
          "hover:bg-position-[0_0%]",
          "active:scale-[0.96]",
          "NavButton",
        ),
        className,
      )}
    >
      {children}
    </a>
  );
};
