//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { ContextContainer } from "@pso/components/page/context-container";
import { pmlog } from "@pso/util/log";
import { acache } from "@pso/util/cache";
import { min2ms } from "@pso/util/time";

/**
 * @param {{duration:import("@pso/util/time").DurationCache}&import("@pso/util/jjsx").JSXProps} p0
 */
function DurationButton({ duration = null, className, children, ...a }) {
  return (
    <button
      {...a}
      onClick={(e) => {
        if (duration == null) return;
        acache("LAST_GAME_DURATION").localstorage().set().json(duration);
      }}
      className={twMerge(
        joinTWClass(
          "h-1/2 aspect-square ",
          "flex justify-center items-center",
          "border-1 border-solid border-gray-200",
          "text-white text-3xl",
          "transition-all",
          "hover:border-green-500",
          "hover:bg-green-500/5",
          "active:scale-[0.96]",
        ),
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
function GridContainer({ className = "", children, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        className,
        joinTWClass(
          "w-[70%] aspect-[1.8]",
          "flex items-center justify-center flex-wrap gap-3",
          "p-7",
          "border-1 border-solid border-gray-300 rounded-[4px]",
        ),
      )}
    >
      {children}
    </div>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function GameDurationMenu({ className = "", ...opt }) {
  const set_cache = acache("LAST_GAME_DURATION").localstorage().set();
  const click = () => {};
  return (
    <ContextContainer
      {...opt}
      className={twMerge(
        className,
        joinTWClass("flex justify-center items-center flex-col gap-7"),
      )}
    >
      <span className="w-[70%] text-white text-center text-3xl">
        Select Game Duration
      </span>
      <GridContainer>
        <DurationButton
          duration={{
            type: "bullet",
            time: min2ms(1),
            rules: {},
          }}
        >
          1 Min
        </DurationButton>
        <DurationButton
          duration={{
            type: "bullet",
            time: min2ms(2),
            rules: {},
          }}
        >
          2 Min
        </DurationButton>
        <DurationButton
          duration={{
            type: "bullet",
            time: min2ms(2),
            rules: {
              1000: {
                move: 1,
                threshold: 1000,
              },
            },
          }}
        >
          2Min+1
        </DurationButton>
        <DurationButton
          duration={{
            time: min2ms(3),
            type: "rapid",
            rules: {},
          }}
        >
          3 Min
        </DurationButton>
        <DurationButton
          duration={{
            time: min2ms(5),
            type: "rapid",
            rules: {},
          }}
        >
          5 Min
        </DurationButton>
        <DurationButton
          duration={{
            time: min2ms(10),
            type: "rapid",
            rules: {},
          }}
        >
          10 Min
        </DurationButton>
      </GridContainer>
    </ContextContainer>
  );
}
