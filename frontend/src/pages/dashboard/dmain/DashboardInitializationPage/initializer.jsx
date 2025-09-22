//@ts-nocheck
import { joinTWClass } from "@pso/util/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { INITIALIZATION_TASK_LIST as tasks } from "./tasks";
import {
  taskCompleted,
  taskFailed,
  taskUpdateTaskStatus,
} from "@pso/store/feature/initialization-data";
import { useEffect } from "react";

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
  const completed_task = useSelector((s) => s.initial.completed_task);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  tasks[completed_task]
    .config()
    .then(() => {
      if (completed_task + 1 == tasks.length) {
        return navigate("/dashboard/index");
      }
      dispatch(taskCompleted());
    })
    .catch(() => navigate("/dashboard/"));
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "w-full h-[30%]",
          "flex justify-around items-center",
          "text-white text-3xl",
          "relative",
          "debug",
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
          // "w-[40%] h-[40%]",
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
