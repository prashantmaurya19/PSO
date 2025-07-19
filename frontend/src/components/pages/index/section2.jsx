import g from "../../../css/global";
import th from "../../../css/theme";
import { join, merge, style } from "../../../css/util";

export default function Section2() {
  return (
    <section
      {...style({
        "&": join(
          {
            height: "95vh",
            outline: g.debug.outline.outline,
          },
          g.full_w,
        ),
      })}
    ></section>
  );
}
