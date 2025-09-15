import NavBar from "@pso/components/header/navbar";
import { LoginButton, NavButton } from "@pso/components/buttons/navbutton";
import { RegistrationForm } from "@pso/components/form/registration";
import { anime } from "@pso/util/anime";
import { useNavigate } from "react-router-dom";
import { SelfContainedLoader } from "@pso/components/loader/form";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { PageLayout, PageContentLayout } from "@pso/components/page/section";

export default function RegistrationPage() {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  const navigate = useNavigate();
  return (
    <PageLayout
      ref={container}
      className="flex justify-center items-center flex-col"
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
      <PageContentLayout className="relative flex justify-center items-center">
        <SelfContainedLoader className="opacity-0" />
        <RegistrationForm className="absolute" />
      </PageContentLayout>
    </PageLayout>
  );
}
