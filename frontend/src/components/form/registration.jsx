import { twMerge } from "tailwind-merge";
import { join } from "../../util/tailwind";
import { getAnimation } from "../../util/animator";
import { useGSAP } from "@gsap/react";
import { InputField, UsernameField } from "./inputs";
import { SingupButton } from "../buttons/form";
import { PasswordField } from "./inputs";
import { FormTitle } from "./title";

/**
 * @param {Object} param0
 * @param {string} [param0.className=""]
 */
export function RegistrationForm({ className = "" }) {
  useGSAP(async () => {
    await getAnimation(
      "login-form-open",
      "#register-form-container",
      ".fields",
    ).get();
  });

  const element_width = "w-[23vw]";
  return (
    <div
      id="register-form-container"
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
        text="Register to Chess.com"
      />
      <InputField
        className={`${element_width} h-[5vh] fields`}
        inputProp={{
          type: "text",
          placeholder: "Enter Full Name",
        }}
      />
      <UsernameField
        className={`${element_width} h-[5vh] fields`}
        inputProp={{
          type: "text",
          placeholder: "Enter Email",
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

      <PasswordField
        className={`${element_width} h-[5vh] fields`}
        inputProp={{
          type: "password",
          placeholder: "Re Enter Password",
          className: "p-3",
        }}
      />
      <SingupButton
        text="Sign Up"
        className={join("fields", `${element_width} h-[5vh]`)}
      />
    </div>
  );
}
