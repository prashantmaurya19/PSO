//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { join } from "@pso/util/tailwind";
import { anime } from "@pso/util/anime";
import { useGSAP } from "@gsap/react";
import { InputField, UsernameField } from "@pso/components/form/inputs";
import { SingupButton } from "@pso/components/buttons/form";
import { PasswordField } from "@pso/components/form/inputs";
import { FormTitle } from "@pso/components/form/title";
import { request, response } from "@pso/util/requests";
import { useRef } from "react";
import { validate } from "@pso/util/validate";
import { useNavigate } from "react-router-dom";

/** all fields has class RegistrationFormFields
 * @param {Object} param0
 * @param {string} [param0.className=""]
 * @param {()=>void|Promise} [param0.onSubmit=()=>{}]
 */
export function RegistrationForm({ onSubmit = () => {}, className = "" }) {
  const navigate = useNavigate();
  const { contextSafe } = useGSAP(async () => {
    await anime()
      .timeline()
      .formContainerShow("#register-form-container")
      .formFieldAll("from", ".RegistrationFormFields")
      .endTimeline()
      .build();
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
          defaultValue: "pika",
          ref: firstname,
          type: "text",
          placeholder: "Enter First Name",
        }}
      />
      <InputField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          ref: lastname,
          defaultValue: "pika",
          type: "text",
          placeholder: "Enter Last Name",
        }}
      />
      <UsernameField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          ref: username,
          defaultValue: "ak@chess.com",
          type: "text",
          placeholder: "Enter Email",
          className: "p-3",
        }}
      />

      <PasswordField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          ref: password,
          defaultValue: "prashant",
          type: "password",
          placeholder: "Enter Password",
          className: "p-3",
        }}
      />

      <PasswordField
        className={`${element_width} h-[5vh] RegistrationFormFields`}
        inputProp={{
          type: "password",
          defaultValue: "prashant",
          placeholder: "Re Enter Password",
          className: "p-3",
        }}
      />
      <SingupButton
        text="Sign Up"
        onClick={contextSafe(async () => {
          try {
            await anime()
              .timeline()
              .formFieldAll("to", ".RegistrationFormFields")
              .formContainerHide("#register-form-container")
              .selfContainedLoaderShow(".SelfContainedLoader")
              .endTimeline()
              .build();
            onSubmit();
            const form_data = {
              email: username.current.value,
              password: password.current.value,
              username: username.current.value,
              firstname: firstname.current.value,
              lastname: lastname.current.value,
            };
            validate(form_data)
              .string("email")
              .limit(4, 64)
              .email()
              .and()
              .string("password")
              .limit(4, 16)
              .and()
              .string("firstname")
              .limit(4, 16)
              .and()
              .string("lastname")
              .limit(4, 16)
              .and()
              .get();
            let resp = await request("/ur/register")
              .post()
              .json()
              .credentials()
              .body(form_data)
              .execute();

            let res = await resp.json();
            if (res.status == "ok") {
              await anime().selfContainedLoaderHide().build();
              navigate("/login", { auth: true });
            } else {
              await anime()
                .timeline()
                .selfContainedLoaderHide(".SelfContainedLoader")
                .formContainerShow("#register-form-container")
                .formFieldAll("from", ".RegistrationFormFields")
                .endTimeline()
                .build();
            }
          } catch {
            await anime()
              .timeline()
              .selfContainedLoaderHide(".SelfContainedLoader")
              .formContainerShow("#register-form-container")
              .formFieldAll("to", ".RegistrationFormFields", {
                opacity: 1,
                y: 0,
              })
              .endTimeline()
              .build();
          }
        })}
        className={join("RegistrationFormFields", `${element_width} h-[5vh]`)}
      />
    </div>
  );
}
