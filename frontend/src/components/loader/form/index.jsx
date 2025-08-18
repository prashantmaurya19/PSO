import { twJoin, twMerge } from "tailwind-merge";

/**
 * @param {{spinner:HTMLSpanElement} & HTMLDivElement} p0
 */
export function SelfContainedLoader({
  spinner = { className: "" },
  className = "",
  ...a
}) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        twJoin(
          "SelfContainedLoader",
          "w-[20%] aspect-[2]",
          "bg-transparent",
          "rounded-xl border-3 border-solid border-index-third",
          "flex justify-center items-center",
          "absolute",
        ),
      )}
    >
      <span
        {...spinner}
        className={twMerge(
          twJoin(
            "SelfContainedLoaderSpinner",
            "animate-spin",
            "aspect-square h-[25%]",
            "rounded-[50%]",
            "border-7 border-solid border-gray-400",
            "border-t-white",
          ),
          spinner.className,
        )}
      ></span>
    </div>
  );
}
