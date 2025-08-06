import NavBar from "../../header/navbar";
import LoginForm from "../../form/login";
import { useNavigate } from "react-router-dom";
import { getAnimation } from "../../../util/animator";
import { NavButton, SignUpButton } from "../../buttons/navbutton";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] bg-bg flex justify-center items-center flex-col overflow-hidden">
      <NavBar>
        <NavButton
          onClick={async function () {
            await getAnimation(
              "login-form-close",
              "#login-form-container",
              ".fields",
            ).get();
            navigate("/");
          }}
        >
          Home
        </NavButton>
        <SignUpButton
          opt={{
            id: "main-navbar-signup-btn",
            onClick: async function (e) {
              e.preventDefault();
              await getAnimation(
                "login-form-close",
                "#login-form-container",
                ".fields",
              ).get();
              navigate("/register");
            },
          }}
          text="sign Up"
        />
      </NavBar>
      <div className="w-full h-[var(--page-sub-section-height)] flex justify-center items-center">
        <LoginForm id="login-form-container" />
      </div>
    </div>
  );
}
