import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import g from "../../../css/global";
import th from "../../../css/theme";
import { join, merge, style } from "../../../css/util";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

function RightSection() {
  return (
    <span
      {...style({
        "&": join(
          {
            height: "50%",
            aspectRatio: 2,
            color: th.index.text.primary,
          },
          g.flexCenter,
        ),
      })}
    >
      <p
        {...style({
          "&": join({
            width: "95%",
            height: "max-content",
            fontSize: "2.2rem",
            textWrap: "wrap",
            textAlign: "center",
          }),
        })}
      >
        <FontAwesomeIcon
          style={{ color: th.index.text.faded_primary3, fontSize: "3rem" }}
          icon={faQuoteLeft}
        />
        <span style={{ fontWeight: 900, color: th.index.third }}>
          Shogi.com
        </span>
        &nbsp; is my master's final years project.
        <br /> i created this because i am enthusiastic for sockets and
        real-time application.
        <br />
        <br /> i love to code and learn about new technologies and algorithm. if
        you have any questions or any opportunity for me please feel free to
        reach me.
        <FontAwesomeIcon
          style={{ color: th.index.text.faded_primary3, fontSize: "3rem" }}
          icon={faQuoteRight}
        />
      </p>
    </span>
  );
}

export default function Section3() {
  return (
    <section
      {...style({
        "&": join(
          {
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "100vh",
          },
          g.full_w,
        ),
      })}
    >
      <RightSection />
    </section>
  );
}
