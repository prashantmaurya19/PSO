import NavBar from "../../components/header/navbar";
import LoginForm from "../../components/form/login";
import { useNavigate } from "react-router-dom";
import { NavButton, SignUpButton } from "../../components/buttons/navbutton";
import { anime } from "../../util/anime";
import { useGSAP } from "@gsap/react";

export default function LoginPage() {
  const { contextSafe } = useGSAP();
  const navigate = useNavigate();
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
        <LoginForm disable id="login-form-container" />
      </div>
    </div>
  );
}
