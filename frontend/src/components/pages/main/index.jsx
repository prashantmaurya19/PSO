import NavBar, { NavButton } from "../../header/navbar";
import {LeftSection,RightSlogan} from "./sections";
import { join } from "../../../util/tailwind";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  const click = async function (e) {
    e.preventDefault();
    await Promise.all([
      gsap.to("#main-left-chess_board", {
        x: -800,
        opacity: 0,
        duration: 1,
      }),
      gsap.to(".main-right", {
        x: 800,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      }),
    ]);
    console.log("animation completed");
    navigate("/login");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col">
      <NavBar>
        <NavButton>Home</NavButton>
        <NavButton>About</NavButton>
        <NavButton
          onClick={click}
          className={join(
            "border-index-third",
            "bg-linear-[0deg,theme(colors.index-primary)_50%,theme(colors.index-third)_50%]",
            "text-index-third",
            "hover:text-index-second",
          )}
        >
          login
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
    <section className="flex flex-row items-center justify-between w-full grow-1 overflow-hidden">
      <LeftSection />
      <RightSlogan />
    </section>
    </div>
  );
}
