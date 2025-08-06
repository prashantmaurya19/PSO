import { twMerge } from "tailwind-merge";
import { join } from "../../util/tailwind";
import { useGSAP } from "@gsap/react";
import { getAnimation } from "../../util/animator";
import { PasswordField, RememberMe, UsernameField } from "./inputs";
import { ForgetPasswordButton, LoginButton } from "../buttons/form";
import { FormTitle } from "./title";

/**
 * @param {import("react").HTMLAttributes} param0
 */
export default function LoginForm({ className = "", ...a }) {
  useGSAP(async () => {
    await getAnimation(
      "login-form-open",
      "#login-form-container",
      ".fields",
    ).get();
  });

  const element_width = "w-[23vw]";
  return (
    <div
      {...a}
      className={twMerge(
        join(
          "flex justify-start items-center flex-col",
          " w-max h-max",
          "px-10 py-10",
          "rounded-2xl",
        ),
        className,
      )}
    >
      <FormTitle
        className={join(`${element_width} h-[5vh]`, "fields")}
        text="Welcome to Chess.com"
      />

      <UsernameField
        className={`${element_width} h-[5vh] fields`}
        inputProp={{
          type: "text",
          placeholder: "Enter Username",
          className: "p-3",
        }}
      />

      <PasswordField
        className={`${element_width} h-[5vh] fields`}
        inputProp={{
          type: "password",
          placeholder: "Enter Password",
          className: "p-3",
        }}
      />

      <div
        className={join(
          "fields",
          `${element_width} h-[5vh]`,
          "text-index-second-500",
          "flex justify-between",
          "text-xl",
        )}
      >
        <RememberMe />
        <ForgetPasswordButton />
      </div>

      <LoginButton className={join("fields", `${element_width} h-[5vh]`)} />
    </div>
  );
}
