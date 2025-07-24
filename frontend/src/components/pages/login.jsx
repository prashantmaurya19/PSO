import th from "../../css/theme";
import g from "../../css/global";
import { join, style } from "../../css/util";
import NavBar from "../header/navbar";
import LoginForm from "./login/form";

export default function LoginPage() {
  return (
    <div
      {...style({
        "&": join({ background: th.bg,height:"max-content",outline:g.debug.outline, width: "100vh" }),
      })}
    >
      <NavBar></NavBar>
      <LoginForm />
    </div>
  );
}
