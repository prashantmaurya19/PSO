import { twMerge } from "tailwind-merge";
import { join } from "../../util/tailwind";
import { anime } from "../../util/anime";
import { useGSAP } from "@gsap/react";
import { InputField, UsernameField } from "./inputs";
import { SingupButton } from "../buttons/form";
import { PasswordField } from "./inputs";
import { FormTitle } from "./title";
import { request } from "../../util/requests";
import { useRef } from "react";
import { validate } from "../../util/validate";

/** all fields has class RegistrationFormFields
 * @param {Object} param0
 * @param {string} [param0.className=""]
 * @param {()=>void|Promise} [param0.onSubmit=()=>{}]
 */
export function RegistrationForm({ onSubmit = () => {}, className = "" }) {
  const { contextSafe } = useGSAP(async () => {
    await anime()
      .timeline()
      .formContainerShow("#register-form-container")
      .formFieldAll("from", ".RegistrationFormFields")
      .endTimeline()
      .build();

    // await getAnimation(
    //   "login-form-open",
    //   "#register-form-container",
    //   ".RegistrationFormFields",
    // ).get();
  });

  const username = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const password = useRef();

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
        className={join(`${element_width} h-[5vh]`, "RegistrationFormFields")}
        text="Register to Chess.com"
      />
      <InputField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          ref: firstname,
          type: "text",
          placeholder: "Enter First Name",
        }}
      />
      <InputField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          ref: lastname,
          type: "text",
          placeholder: "Enter Last Name",
        }}
      />
      <UsernameField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          ref: username,
          type: "text",
          placeholder: "Enter Email",
          className: "p-3",
        }}
      />

      <PasswordField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          ref: password,
          type: "password",
          placeholder: "Enter Password",
          className: "p-3",
        }}
      />

      <PasswordField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          type: "password",
          placeholder: "Re Enter Password",
          className: "p-3",
        }}
      />
      <SingupButton
        text="Sign Up"
        onClick={contextSafe(async () => {
          onSubmit();
          // await anime()
          //   .timeline()
          //   .formFieldAll("to", ".RegistrationFormFields")
          //   .formContainerHide("#register-form-container")
          //   .selfContainedLoaderShow(".SelfContainedLoader")
          //   .endTimeline()
          //   .build();
          const form_data = {
            email: username.current.value,
            password: password.current.value,
            username: username.current.value,
            firstname: firstname.current.value,
            lastname: lastname.current.value,
          };
          console.log(
            validate(form_data)
              .string("username")
              .limit(4, 64)
              .email()
              .and()
              .string("password")
              .limit(4, 16)
              .and()
              .get(),
          );
          const response = await request("/ur/register")
            .post()
            .json()
            .body(form_data)
            .execute();

          const res = await response.json();
          if (res.status == "ok") {
            await anime().selfContainedLoaderHide().build();
          }
        })}
        className={join("RegistrationFormFields", `${element_width} h-[5vh]`)}
      />
    </div>
  );
}
