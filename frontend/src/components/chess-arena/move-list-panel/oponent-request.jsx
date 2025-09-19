//@ts-nocheck

import { faC, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconWraper } from "@pso/components/icon";
import { pmlog } from "@pso/util/log";
import { joinTWClass } from "@pso/util/tailwind";
import { twMerge } from "tailwind-merge";

/**
 * @param {{icon:import("@fortawesome/free-regular-svg-icons").IconDefinition}&import("@pso/util/jjsx").JSXProps} p
 */
function ButtonIcon({ icon }) {
  return (
    <IconWraper className="h-full w-full flex justify-center items-center">
      <FontAwesomeIcon icon={icon} style={{ color: "gray" }} size="md" />
    </IconWraper>
  );
}

/**
 * @param {{icon:import("react").FC}&import("@pso/util/jjsx").JSXProps} p
 */
export function OponentRequestFieldButton({ icon, className, ...a }) {
  return (
    <button
      {...a}
      className={twMerge(
        joinTWClass(
          "h-[91%] aspect-[13/10]",
          "bg-gray-600/25",
          "transition-all",
          "hover:bg-gray-600/70",
          "active:scale-[0.87]",
          "text-2xl",
        ),
        className,
      )}
    >
      {icon}
    </button>
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function OponentRequestFieldDeclineButton({ ...a }) {
  return (
    <OponentRequestFieldButton {...a} icon={<ButtonIcon icon={faXmark} />} />
  );
}

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function OponentRequestFieldAcceptButton({ ...a }) {
  return (
    <OponentRequestFieldButton {...a} icon={<ButtonIcon icon={faCheck} />} />
  );
}

/**
 * @param {Partial<{title:string}>&import("@pso/util/jjsx").JSXProps} p
 */
export function OponentRequestField({ title = "no title", className, ...a }) {
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass("w-full h-[10%]", "flex justify-around items-center"),
        className,
      )}
    >
      <span
        className={joinTWClass(
          "text-white text-md",
          "w-[70%] h-full",
          "flex justify-start items-center",
          "p-2",
        )}
      >
        {title}
      </span>
      <OponentRequestFieldDeclineButton
        onClick={(e) => {
          console.log("OponentRequestFieldDeclineButton is clicked");
        }}
      />
      <OponentRequestFieldAcceptButton
        onClick={(e) => {
          console.log("OponentRequestFieldAcceptButton is clicked");
        }}
      />
    </div>
  );
}
