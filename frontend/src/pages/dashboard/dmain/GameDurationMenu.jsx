//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { ContextContainer } from "@pso/components/page/context-container";
import { pmlog } from "@pso/util/log";
import { acache } from "@pso/util/cache";
import { min2ms, TIME_DURATION_CATAGORIES } from "@pso/util/time";
import { useNavigate } from "react-router-dom";

/**
 * @param {{duration:import("@pso/util/time").DurationCache}&import("@pso/util/jjsx").JSXProps} p0
 */
function DurationButton({ duration = null, className, children, ...a }) {
  const navigate = useNavigate();
  return (
    <button
      {...a}
      onClick={(e) => {
        if (duration == null) return;
        acache("LAST_GAME_DURATION").localstorage().set().json(duration);
        navigate("/dashboard/chess_arena", { state: { auth: true } });
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
        {TIME_DURATION_CATAGORIES.map((v, i) => {
          return (
            <DurationButton key={i} duration={v}>
              {v.label}
            </DurationButton>
          );
        })}
      </GridContainer>
    </ContextContainer>
  );
}
