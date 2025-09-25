// @ts-nocheck
import { joinTWClass } from "@pso/util/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import {
  RESULT,
  INITIALIZATION_TASK_LIST as tasks,
} from "@pso/var-data/initialization-data";
import {
  initializeInitData,
  taskCompleted,
  taskFailed,
  taskUpdateTaskStatus,
} from "@pso/store/feature/initialization-data";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { anime } from "@pso/util/anime";
import { deleteCookie } from "@pso/util/acookie";
import { ApplicationListener } from "@pso/listeners/app-listeners";
import { pmlog } from "@pso/util/log";
import { PromotionPieceOverlay } from "@pso/components/chess-arena/chess-board/promotion-piece-overlay";
import {
  getInitializerState,
  initializerOff,
  initializerOn,
} from "@pso/var-data/component-data/initializer";

/**
 * @typedef {"done"|"processing"|"failed"} TaskStatus
 */

/**
 * @param {{text:string,done:boolean}&import("@pso/util/jjsx").JSXProps} p
 */
function TaskLabel({ text, className, ...a }) {
  const status = useSelector((s) => s.initial.task.status);
  return (
    <span
      {...a}
      className={twMerge(
        joinTWClass(
          "text-3xl",
          status == "processing"
            ? "text-yellow-600"
            : status == "done"
              ? "text-green-400"
              : "text-red-500",
        ),
        className,
      )}
    >
      {text}
    </span>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
function IntializationProcessBanner({ className, ...a }) {
  const location = useLocation();
  const [completed_task, setCompleteTask] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (getInitializerState() && completed_task < tasks.length) {
      tasks[completed_task]
        .config()
        .then(() => {
          setTimeout(() => setCompleteTask(completed_task + 1), 500);
        })
        .catch(() => {
          ApplicationListener.onLogout();
          navigate("/login");
        });
      initializerOff();
    }
    return () => {
      initializerOn();
    };
  }, [completed_task]);
  if (completed_task == tasks.length) {
    RESULT.initialized = true;
    return (
      <Navigate
        to={location.state?.to ? location.state.to : "/dashboard/index"}
        state={{ initialization: true }}
      />
    );
  }
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full h-[30%]",
          "flex justify-around items-center",
          "text-white text-3xl",
        ),
        className,
      )}
    >
      <TaskLabel text={tasks[completed_task].name} />
      <TaskLabel text={`${completed_task}/${tasks.length}`} />
    </div>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function InitializerContainer({ className, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "flex justify-start items-center flex-col gap-3",
          "w-[30%] aspect-[1.3]",
          "p-10",
          "bg-transparent",
          "rounded-xl border-3 border-solid border-index-third",
        ),
        className,
      )}
    >
      <IntializationProcessBanner />
      <span
        className={twMerge(
          joinTWClass(
            "animate-spin",
            "aspect-square h-[25%]",
            "rounded-[50%]",
            "border-7 border-solid border-gray-400",
            "border-t-white",
          ),
        )}
      ></span>
    </div>
  );
}
