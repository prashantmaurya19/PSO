import NavBar from "../../components/header/navbar";
import { LoginButton, NavButton } from "../../components/buttons/navbutton";
import { RegistrationForm } from "../../components/form/registration";
import { anime } from "../../util/anime";
import { useNavigate } from "react-router-dom";
import { SelfContainedLoader } from "../../components/loader/form";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function RegistrationPage() {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  const navigate = useNavigate();
  return (
    <div
      ref={container}
      className="h-[100vh] w-[100vw] bg-bg flex justify-center items-center flex-col overflow-hidden "
    >
      <NavBar>
        <NavButton
          onClick={contextSafe(async function () {
            await anime()
              .timeline()
              .formFieldAll("to", ".RegistrationFormFields")
              .formContainerHide("#register-form-container")
              .endTimeline()
              .build();
            navigate("/");
          })}
        >
          Home
        </NavButton>
        <LoginButton
          onClick={contextSafe(async function () {
            await anime()
              .timeline()
              .formFieldAll("to", ".RegistrationFormFields")
              .formContainerHide("#register-form-container")
              .build();
            navigate("/login");
          })}
          text="login"
        />
      </NavBar>
      <section className="w-full grow-1 flex justify-center items-center relative">
        <SelfContainedLoader className="opacity-0" />
        <RegistrationForm className="absolute" />
      </section>
    </div>
  );
}
