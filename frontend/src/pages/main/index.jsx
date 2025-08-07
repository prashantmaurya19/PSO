import { LoginButton, SignUpButton } from "../../components/buttons/navbutton";
import { LeftSection, RightSlogan } from "./sections";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { getAnimation } from "../../util/animator";
import NavBar from "../../components/header/navbar";

export default function IndexPage() {
  const navigate = useNavigate();

  useGSAP(async () => {
    await getAnimation("main.open").get();
  });

  return (
    <div className="bg-bg w-[100vw] h-[100vh] flex justify-center items-center flex-col">
      <NavBar>
        <LoginButton
          id={"main-navbar-login-btn"}
          onClick={async function (e) {
            e.preventDefault();
            await Promise.all(getAnimation("main.close").get());
            navigate("/login");
          }}
          text="login"
        />

        <SignUpButton
          onClick={async function (e) {
            e.preventDefault();
            await Promise.all(getAnimation("main.close").get());
            navigate("/register");
          }}
          text="sign Up"
        />
      </NavBar>
      <section className="flex flex-row items-center justify-between w-full grow-1 overflow-hidden">
        <LeftSection />
        <RightSlogan />
      </section>
    </div>
  );
}
