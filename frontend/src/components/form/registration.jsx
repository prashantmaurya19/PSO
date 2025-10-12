//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { join, joinTWClass } from "@pso/util/tailwind";
import { anime } from "@pso/util/anime";
import { useGSAP } from "@gsap/react";
import { InputField, UsernameField } from "@pso/components/form/inputs";
import { SingupButton } from "@pso/components/buttons/form";
import { PasswordField } from "@pso/components/form/inputs";
import { FormTitle } from "@pso/components/form/title";
import { request, response } from "@pso/util/requests";
import { useRef } from "react";
import { StringValidation, validate } from "@pso/util/validate";
import { useNavigate } from "react-router-dom";
import { formatPlayerName } from "@pso/util/astring";

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
  const form_field_error_handler = (e, err) => {
    e.current.parentNode.setAttribute("data-status", "error");

    const error_ele =
      e.current.parentNode.nextElementSibling.tagName == "SPAN"
        ? e.current.parentNode.nextElementSibling
        : document.createElement("span");
    for (const s of joinTWClass(
      "text-red-600 text-sm",
      "flex justify-start items-center",
      "w-[90%] h-[4%] mb-3",
    ).split(" ")) {
      error_ele.classList.add(s);
    }
    e.current.parentNode.classList.remove("mb-3");
    error_ele.innerHTML = err;
    e.current.parentNode.insertAdjacentElement("afterend", error_ele);
    throw Error();
  };

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
            onSubmit();
            const form_data = {
              email: username.current.value,
              password: password.current.value,
              username: username.current.value,
              firstname: firstname.current.value,
              lastname: lastname.current.value,
            };

            validate(form_data.email).email(
              form_field_error_handler.bind(this, username, "Invalid Email!"),
            );
            validate(form_data.password).limit(
              4,
              16,
              form_field_error_handler.bind(
                this,
                password,
                "Invalid Password Lenght!",
              ),
            );
            validate(form_data.firstname).limit(
              4,
              16,
              form_field_error_handler.bind(
                this,
                firstname,
                "firstname must be greater then 4 and less then 16",
              ),
            );
            validate(form_data.lastname).limit(
              4,
              16,
              form_field_error_handler.bind(this, lastname, "fuck"),
            );

            // let resp = await request("/ur/register")
            //   .post()
            //   .json()
            //   .credentials()
            //   .body(form_data)
            //   .execute();

            // let res = await resp.json();
            // if (res.status == "ok") {
            // await anime()
            //   .timeline()
            //   .formFieldAll("to", ".RegistrationFormFields")
            //   .formContainerHide("#register-form-container")
            //   .selfContainedLoaderShow(".SelfContainedLoader")
            //   .endTimeline()
            //   .build();
            //   await anime().selfContainedLoaderHide().build();
            //   navigate("/login", { auth: true });
            // } else {
            //   await anime()
            //     .timeline()
            //     .selfContainedLoaderHide(".SelfContainedLoader")
            //     .formContainerShow("#register-form-container")
            //     .formFieldAll("from", ".RegistrationFormFields")
            //     .endTimeline()
            //     .build();
            // }
          } catch (e) {
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
