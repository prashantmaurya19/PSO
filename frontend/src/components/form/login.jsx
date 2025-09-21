//@ts-nocheck
import { twMerge } from "tailwind-merge";
import { join } from "@pso/util/tailwind";
import { useGSAP } from "@gsap/react";
import { PasswordField, UsernameField } from "@pso/components/form/inputs";
import { LoginButton } from "@pso/components/buttons/form";
import { FormTitle } from "@pso/components/form/title";
import { anime } from "@pso/util/anime";
import { validate } from "@pso/util/validate";
import { useRef } from "react";
import { request, response } from "@pso/util/requests";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "@pso/util/acookie";
import { pmlog } from "@pso/util/log";

/**
 * @param {{disable:boolean}&import("react").HTMLAttributes} param0
 */
export default function LoginForm({ disable = false, className = "", ...a }) {
  const navigate = useNavigate();
  const username_element = useRef();
  const password_element = useRef();
  const { contextSafe } = useGSAP(async () => {
    await anime()
      .timeline()
      .formContainerShow("#login-form-container")
      .formFieldAll("from", ".fields")
      .endTimeline()
      .build();
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
          ref: username_element,
          type: "text",
          placeholder: "Enter Username",
          className: "p-3",
        }}
      />

      <PasswordField
        className={`${element_width} h-[5vh] fields`}
        inputProp={{
          ref: password_element,
          type: "password",
          placeholder: "Enter Password",
          className: "p-3",
        }}
      />

      <LoginButton
        onClick={contextSafe(async function () {
          const form_data = {
            username: username_element.current.value,
            password: password_element.current.value,
          };
          try {
            if (!disable) {
              // validate credentials here
              validate(form_data)
                .string("username")
                .limit(4, 64)
                .email()
                .and()
                .string("password")
                .limit(4, 16)
                .and()
                .get();
              const resp = await request("/ur/user/login")
                .post()
                .httpBasic(form_data.username, form_data.password)
                .execute();
              const res = await resp.json();
              pmlog(res);
              setCookie("token_id", res.token);
            }
          } catch (error) {
            return console.log(error);
          }
          await anime()
            .timeline()
            .formFieldAll("to", ".fields")
            .formContainerHide("#login-form-container")
            .endTimeline()
            .build();
          navigate("/dashboard", { state: { auth: true } });
        })}
        className={join("fields", `${element_width} h-[5vh]`)}
      />
    </div>
  );
}
