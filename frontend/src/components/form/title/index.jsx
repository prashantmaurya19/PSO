import { twMerge } from "tailwind-merge";
import { join } from "@pso/util/tailwind";

/**
 * @param {{text:string} & import("react").HtmlHTMLAttributes} param0
 */
export function FormTitle({ text, className, ...args }) {
  return (
    <span
      {...args}
      className={twMerge(
        join(
          "bg-transparent text-index-third",
          "border-2 border-solid border-index-third",
          "flex items-center justify-center",
          "text-lg",
          "rounded-[10px]",
          "mb-10",
        ),
        className,
      )}
    >
      {text}
    </span>
  );
}
