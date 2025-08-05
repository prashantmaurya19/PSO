import NavBar, { NavButton } from "../../header/navbar";
import LoginForm from "./form";
import { useNavigate } from "react-router-dom";
import { join } from "../../../util/tailwind";
import { getAnimation } from "../../../util/animator";

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
        <NavButton
          className={join(
            "border-index-forth",
            "bg-linear-[0deg,theme(colors.index-primary)_50%,theme(colors.index-forth)_50%]",
            "text-index-forth",
            "hover:text-index-second",
          )}
        >
          sign Up
        </NavButton>
      </NavBar>
      <div className="w-full h-[var(--page-sub-section-height)] flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
