// import { join, merge, style } from "../../css/util";
import th from "../../css/theme";
import NavBar, { NavButton } from "../header/navbar";
import Section1 from "./index/section1";
import Section2 from "./index/section2";
import Section3 from "./index/section3";
import InfoFooter from "../footer/info";
import { join, style } from "../../css/util";
import g from "../../css/global";

export default function Index() {
  return (
    <div {...style({ "&": join({}, g.width_with_scroll) })}>
      <NavBar>
        <NavButton>Home</NavButton>
        <NavButton>About</NavButton>
        <NavButton
          to="/login"
          css={{
            "&": {
              borderColor: th.index.third,
              background: `linear-gradient(0deg,${th.index.primary} 50%, ${th.index.third} 50%)`,
              color: th.index.third,
            },
            hover: {
              color: th.index.text.primary,
            },
          }}
        >
          login
        </NavButton>
        <NavButton
          css={{
            "&": {
              borderColor: th.index.forth,
              background: `linear-gradient(0deg,${th.index.primary} 50%, ${th.index.forth} 50%)`,
              color: th.index.forth,
            },
            hover: {
              color: th.index.text.primary,
            },
          }}
        >
          sign Up
        </NavButton>
      </NavBar>
      <Section1 />
      <Section2 />
      <Section3 />
      <InfoFooter />
    </div>
  );
}
