//@ts-nocheck
import NavBar from "@pso/components/header/navbar";
import LoginForm from "@pso/components/form/login";
import { Navigate, useNavigate } from "react-router-dom";
import { NavButton, SignUpButton } from "@pso/components/buttons/navbutton";
import { anime } from "@pso/util/anime";
import { useGSAP } from "@gsap/react";
import { hasCookie } from "@pso/util/acookie";

export default function LoginPage() {
  const { contextSafe } = useGSAP();
  const navigate = useNavigate();
  if (hasCookie("token_id")) return <Navigate to={"/dashboard"} />;
  return (
    <div className="h-[100vh] w-[100vw] bg-bg flex justify-center items-center flex-col overflow-hidden">
      <NavBar>
        <NavButton
          onClick={contextSafe(async function () {
            await anime()
              .timeline()
              .formFieldAll("to", ".fields")
              .formContainerHide("#login-form-container")
              .endTimeline()
              .build();
            navigate("/");
          })}
        >
          Home
        </NavButton>
        <SignUpButton
          onClick={contextSafe(async function (e) {
            e.preventDefault();
            await anime()
              .timeline()
              .formFieldAll("to", ".fields")
              .formContainerHide("#login-form-container")
              .endTimeline()
              .build();
            navigate("/register");
          })}
          text="sign Up"
        />
      </NavBar>
      <div className="w-full h-[var(--page-sub-section-height)] flex justify-center items-center">
        <LoginForm id="login-form-container" />
      </div>
    </div>
  );
}
