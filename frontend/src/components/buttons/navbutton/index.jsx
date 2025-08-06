import { join } from "../../../util/tailwind";
import "react";
import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * @param {Object} param0
 * @param {{id:string, to:string ,onClick:function(object):void}} [param0.opt={}]
 * @param {string} className
 */
export function SignUpButton({ className, text = "", opt = {} }) {
  return (
    <NavButton
      {...opt}
      className={twMerge(
        join(
          "border-index-forth",
          "bg-linear-0",
          "from-index-primary from-50%",
          "to-index-forth to-50%",
          "text-index-forth",
          "hover:text-index-second",
          "overflow-hidden",
        ),
        className,
      )}
    >
      {text}
    </NavButton>
  );
}

/**
 * @param {Object} param0
 * @param {{id:string, to:string ,onClick:function(object):void}} [param0.opt={}]
 * @param {string} className
 */
export function LoginButton({ className, text, opt = {} }) {
  return (
    <NavButton
      className={twMerge(
        join(
          "border-index-third",
          "bg-linear-0",
          "from-index-primary from-50%",
          "to-index-third to-50%",
          "text-index-third",
          "hover:text-index-second",
          "overflow-hidden",
        ),
        className,
      )}
      {...opt}
    >
      {text}
    </NavButton>
  );
}

/**
 * @param {{id:string, className:string,to:string ,onClick:function(object):void}}
 */
export const NavButton = ({
  onClick = null,
  className = "",
  to = "#",
  children,
  id = "",
}) => {
  return (
    <a
      id={id}
      onClick={onClick}
      to={to}
      className={twMerge(
        join(
          "no-underline",
          "font-[inherit]",
          "aspect-[3/1] h-full",
          "ml-2",
          "rounded-3xl",
          "text-index-second",
          "border-1 border-index-second border-solid",
          "bg-linear-0",
          "from-index-primary from-50%",
          "to-index-second to-50%",
          "bg-size-[100%_200%]",
          "bg-position-[0_100%]",
          "cursor-default",
          "transition-background duration-75 ease-in-out",
          "flex items-center justify-center",
          "hover:text-index-primary",
          "hover:bg-position-[0_0%]",
        ),
        className,
      )}
    >
      {children}
    </a>
  );
};
