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
          "w-[20vw] h-[30vh]",
          "bg-cyan-400/5",
          "rounded-xl border-3 border-solid border-green-400",
          "flex justify-center items-center",
        ),
      )}
    >
      <span
        {...spinner}
        className={twMerge(
          twJoin(
            "SelfContainedLoaderspinner",
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
