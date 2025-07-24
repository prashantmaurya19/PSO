import th from "../../../css/theme";
import g from "../../../css/global";
import { join, style } from "../../../css/util";

export default function LoginForm() {
  return (
    <div
      {...style({
        "&": join(
          {
            background: g.debug.background,
            height: "95.99vh",
            outline: g.debug.outline,
          },
          g.full_w,
        ),
      })}
    ></div>
  );
}
