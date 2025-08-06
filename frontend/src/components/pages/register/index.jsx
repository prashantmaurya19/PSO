import NavBar from "../../header/navbar";
import { LoginButton, NavButton } from "../../buttons/navbutton";
import { RegistrationForm } from "../../form/registration";
import { getAnimation } from "../../../util/animator";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] bg-bg flex justify-center items-center flex-col overflow-hidden">
      <NavBar>
        <NavButton
          onClick={async function () {
            await getAnimation(
              "login-form-close",
              "#register-form-container",
              ".fields",
            ).get();
            navigate("/");
          }}
        >
          Home
        </NavButton>
        <LoginButton
          opt={{
            onClick: async function () {
              await getAnimation(
                "login-form-close",
                "#register-form-container",
                ".fields",
              ).get();
              navigate("/login");
            },
          }}
          text="login"
        />
      </NavBar>
      <section className="w-full grow-1 flex justify-center items-center">
        <RegistrationForm />
      </section>
    </div>
  );
}
