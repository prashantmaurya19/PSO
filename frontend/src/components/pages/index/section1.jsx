import g from "../../../css/global";
import th from "../../../css/theme";
import { join, merge, style } from "../../../css/util";

/**
 * @param {{css:import("../../../css/util").CssPsedoProperties}}
 */
function SloganText({ css = {}, children }) {
  return (
    <span
      {...style(
        merge(
          {
            "&": join({
              display: "block",
              fontSize: "5rem",
              fontStyle: "italic",
              width: "90%",
              textAlign: "center",
            }),
          },
          css,
        ),
      )}
    >
      {children}
    </span>
  );
}

function RightSlogan() {
  return (
    <div
      {...style({
        "&": {
          display: "flex",
          flexDirection: "column",
          aspectRatio: 1,
          height: "80%",
          background: "transperent",
          color: th.index.text.primary,
          alignItems: "center",
          justifyContent: "start",
          // padding: "10px",
          fontFamily: "DM Sans",
          fontWeight: 900,
        },
      })}
    >
      <SloganText
        css={{
          "&": {
            fontSize: "10rem",
            textAlign: "start",
          },
        }}
      >
        Play
      </SloganText>
      <SloganText
        css={{
          "&": join({
            fontSize: "15rem",
            // fontStyle:"normal"
          }),
        }}
      >
        Enjoy
      </SloganText>
      <SloganText
        css={{
          "&": {
            fontSize: "7rem",
            textAlign: "end",
          },
        }}
      >
        Compete
      </SloganText>
    </div>
  );
}

function ShogiPices() {
  return (
    <div
      {...style({
        "&": {
          aspectRatio: 1.2,
          height: "50%",
          background: "white",
        },
      })}
    >
      <div></div>
      <div></div>
    </div>
  );
}

function LeftSection() {
  return (
    <div
      {...style({
        "&": {
          height: "99%",
          width: "35%",
          display: "flex",
          alignItems: "end",
          justifyContent: "start",
          // padding: "2%",
        },
      })}
    >
      <span
        {...style({
          "&": join(
            {
              width: "150px",
              height: "30px",
              fontSize: "20px",
	      fontFamily:"Roboto",
              borderRadius: "15px",
              color: th.index.third,
              border: "1px solid",
              borderColor: th.index.third,
            },
            g.flexCenter,
          ),
        })}
      >
        more here
        <span
          {...style({
            "&": {
              overflow: "hidden",
              height: "100%",
              paddingTop: "10%",
              animation: "topDownPadding 600ms infinite",
            },
          })}
        >
          <span className="material-symbols-outlined">
            keyboard_double_arrow_down
          </span>
        </span>
      </span>
    </div>
  );
}

export default function Section1() {
  return (
    <section
      {...style({
        "&": join(
          {
            display: "flex",
            height: "95vh",
            alignItems: "center",
            justifyContent: "end",
          },
          g.full_w,
        ),
      })}
    >
      <LeftSection />
      <ShogiPices />
      <RightSlogan />
    </section>
  );
}
