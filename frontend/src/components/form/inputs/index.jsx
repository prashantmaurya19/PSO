//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
import { pmlog } from "@pso/util/log";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export function RememberMe({ className = "" }) {
  return (
    <span className={twMerge(joinTWClass("h-full w-max"), className)}>
      <input type="checkbox" /> Remember me
    </span>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps  & {inputProp:import("@pso/util/jjsx").JSXProps}} p
 */
export function UsernameField(p) {
  return (
    <InputField
      {...p}
      icon={
        <svg
          className="h-full aspect-square mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path
            className="fill-index-second"
            d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
          />
        </svg>
      }
    />
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps  & {inputProp:import("@pso/util/jjsx").JSXProps}} p
 */
export function PasswordField({ inputProp, ...p }) {
  const input_ele = useRef();
  const [type, setInputType] = useState("password");
  return (
    <InputField
      {...p}
      inputProp={{ ref: input_ele, ...inputProp, type }}
      icon={
        <button
          onClick={(e) => {
            setInputType(type == "password" ? "text" : "password");
            e.preventDefault();
          }}
          className={joinTWClass(
            "text-lg",
            "h-full aspect-square mr-1",
            "mr-1",
            "flex justify-center items-center",
          )}
        >
          <FontAwesomeIcon
            icon={type == "password" ? faEyeSlash : faEye}
            size="xl"
            style={{ color: "white" }}
          />
        </button>
      }
    />
  );
}

/**
 * @typedef {import("react").HTMLProps & {inputProp:import("react").InputHTMLAttributes & import("react").HTMLProps,icon:import("react").JSX.Element}} InputFieldProps
 */

/**
 * @param {InputFieldProps} param0
 */
export function InputField({ className = "", inputProp, icon, ...args }) {
  return (
    <div
      {...args}
      className={twMerge(
        joinTWClass(
          "border-index-third border-2 border-solid",
          "flex justify-center items-center",
          "mb-3",
          "rounded-4xl",
          "overflow-hidden",
          "bg-index-third",
        ),
        className,
      )}
    >
      <input
        {...{
          ...inputProp,
          className: twMerge(
            joinTWClass(
              "h-full",
              "bg-bg",
              "text-index-second",
              "p-3",
              "grow-1",
              "focus:outline-none",
            ),
            inputProp.className,
          ),
        }}
      />
      {icon}
    </div>
  );
}
