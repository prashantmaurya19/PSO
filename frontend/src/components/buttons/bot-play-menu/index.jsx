import { twMerge } from "tailwind-merge";
import { joinTWClass } from "../../../util/tailwind";
import { FaChevronDown } from "react-icons/fa";

/**
 * @param {import("../../../util/jjsx").JSXElement} p
 */
export function BotPlayFormSubmitButton({ children, className, ...a }) {
  return (
    <button
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-[30%] h-[10%]",
          "text-index-second text-4xl",
          "active:scale-[0.96]",
          "transition-all",
          "border-1 border-solid border-gray-200",
          "hover:border-index-third",
          "hover:text-index-third",
        ),
      )}
    >
      {children}
    </button>
  );
}

/**
 * @param {import("../../../util/jjsx").JSXElement} p
 */
export function DropDownButton({ className = "", children, ...a }) {
  return (
    <button
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-fit min-w-[15vw]",
          "py-2 px-3",
          "bg-transparent",
          "rounded-[3px]",
          "flex items-center justify-between",
          "text-index-second text-2xl",
          "cursor-pointer",
          "border-2 border-solid border-gray-500",
        ),
      )}
    >
      {children}
      <span className="flex items-center justify-center">
        <FaChevronDown />
      </span>
    </button>
  );
}
