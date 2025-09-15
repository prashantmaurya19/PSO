//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { useSelector } from "react-redux";

/**
 * @param {{lengthlenght:number,index:number,text:string}&import("../../../util/jjsx").JSXProps} param0
 */
export function LoadingTextChar({
  length,
  index,
  text = "",
  children = "",
  ...a
}) {
  return (
    <span
      {...a}
      i={index}
      className={joinTWClass(
        "text-white",
        "text-5xl font-bold italic",
        "animate-text-trailing-flashing",
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animationDuration: `${length * 100}ms`,
        // animationTimingFunction: `steps(${length - 3})`,
        animationTimingFunction: `linear`,
      }}
    >
      {(function () {
        if (text == " ") {
          return <>&nbsp;</>;
        }
        return text;
      })()}
    </span>
  );
}

/**
 * @param {{text:string}&import("../../../util/jjsx").JSXProps}
 */
export function FindOponentLoader({
  text = "Finding Oponent...",
  className = "",
  ...a
}) {
  const display = useSelector(
    (s) => s.component_data.chess_board.loader.display,
  );
  if (!display) return <></>;
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "h-full w-full",
          "absolute",
          "backdrop-blur-xs",
          "bg-black/20",
          "flex items-center justify-center",
        ),
      )}
    >
      <span
        className={joinTWClass(
          "w-fit h-fit",
          "flex justify-start items-center",
        )}
      >
        {(function (str) {
          const res = [];
          for (const i in str) {
            res.push(
              <LoadingTextChar
                length={str.length}
                index={parseInt(i)}
                text={str.charAt(i)}
                key={i}
              />,
            );
          }
          return res;
        })(text)}
      </span>
    </div>
  );
}
