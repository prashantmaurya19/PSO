import NavBar, { LoginButton, NavButton } from "../../header/navbar";
import { RegistrationForm } from "../login/form";
import { getAnimation } from "../../../util/animator";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] bg-bg flex justify-center items-center flex-col overflow-hidden">
      <NavBar>
        <NavButton
          id="register-navbar-home-btn"
          onClick={async function () {
            await Promise.all(
              getAnimation(
                "login-form-close",
                "#register-form-container",
                ".fields",
              )
                .with("nav-button-close", "#register-navbar-home-btn")
                .get(),
            );
            navigate("/");
          }}
        >
          Home
        </NavButton>
        <LoginButton
          opt={{
            id: "register-navbar-signup-btn",
            onClick: async function () {
              await Promise.all(
                getAnimation(
                  "login-form-close",
                  "#register-form-container",
                  ".fields",
                )
                  .with("nav-button-close", "#register-navbar-signup-btn")
                  .get(),
              );
              navigate("/login");
            },
          }}
        >
          login
        </LoginButton>
      </NavBar>
      <section className="w-full grow-1 flex justify-center items-center">
        <RegistrationForm />
      </section>
    </div>
  );
}
