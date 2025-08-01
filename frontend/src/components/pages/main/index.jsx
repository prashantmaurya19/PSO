import NavBar, { NavButton } from "../../header/navbar";
import Section1 from "./section1";
import { join } from "../../../util/tailwind";

export default function IndexPage() {
  return (
    <div className="w-full h-full">
      <NavBar>
        <NavButton>Home</NavButton>
        <NavButton>About</NavButton>
        <NavButton
          to="/login"
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
      <Section1 />
    </div>
  );
}
