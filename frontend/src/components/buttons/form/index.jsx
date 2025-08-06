import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { join } from "../../../util/tailwind";

/**
 * @typedef {{text:string} & import("react").ButtonHTMLAttributes} SubmitButtonProps
 *
 */

export function ForgetPasswordButton({ className = "" }) {
  const navigate = useNavigate();
  return (
    <a
      className={twMerge(join("w-max h-full"), className)}
      onClick={(_e) => navigate("/")}
    >
      Forget Password?
    </a>
  );
}

/**
 * @param {SubmitButtonProps} p0
 */
export function LoginButton({ className = "", ...args }) {
  return (
    <SubmitButton
      {...args}
      className={twMerge(
        join("text-index-third", "border-index-third"),
        className,
      )}
    />
  );
}

/**
 * @param {SubmitButtonProps} p0
 */
export function SingupButton({ className = "", ...args }) {
  return (
    <SubmitButton
      {...args}
      className={twMerge(
        join("text-index-forth", "border-index-forth"),
        className,
      )}
    />
  );
}

/**
 * @param {SubmitButtonProps} p0
 */
export function SubmitButton({ text = "submit", className = "", ...args }) {
  return (
    <button
      {...args}
      className={twMerge(
        join(
          "text-index-second ",
          "text-lg",
          "border-index-second",
          "border-2 border-solid ",
          "rounded-4xl",
        ),
        className,
      )}
    >
      {text}
    </button>
  );
}
