import g from "../../../css/global";
import th from "../../../css/theme";
import { join, merge, style } from "../../../css/util";

function Field({ head = "key", value = "value" }) {
  return (
    <span
      {...style({
        "&": join(
          {
            display: "flex",
            height: "10%",
            // outline: g.debug.outline,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            margin: "0 0 7% 0",
          },
          g.full_w,
        ),
      })}
    >
      <p
        {...style({
          "&": join(
            {
              width: "100%",
              fontFamily: "Roboto",
              fontSize: "3rem",
              color: th.index.text.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
              paddingTop: "4px",
              zIndex: 1,
              position: "absolute",
              cursor: "default",
            },
            g.full_h,
          ),

          "hover + p": {
            backgroundPosition: "0% 0%",
          },
        })}
      >
        {value}
      </p>
      <p
        {...style({
          "&": join(
            {
              fontFamily: "Roboto",
              fontSize: "5rem",
              textTransform: "uppercase",
              fontWeight: 900,
              fontStyle: "italic",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              background: `linear-gradient(90deg ,${th.index.third} 50%,${th.index.text.faded_primary} 50%)`,
              backgroundSize: "200% 100%",
              transition: "all 200ms linear",
              backgroundPosition: "100% 0%",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "none",
            },
            g.full_h,
          ),
        })}
      >
        {head}
      </p>
    </span>
  );
}

function IntroductionSection() {
  const fixwidth = "98%";
  return (
    <div
      {...style({
        "&": join(
          {
            width: "31%",
            height: "90%",
            clipPath: "polygon(50% 100%, 100% 71%, 100% 0, 0 0, 0 71%)",
            background: th.index.third,
            margin: "10px 0 0 10px",
          },
          g.flexCenter,
        ),
      })}
    >
      <div
        {...style({
          "&": {
            width: "97%",
            height: "97%",
            clipPath: "polygon(50% 100%, 100% 71%, 100% 0, 0 0, 0 71%)",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "1%",
            flexDirection: "column",
            border: "1px solid",
            background: th.index.primary,
            borderColor: th.index.text.third,
          },
        })}
      >
        <span
          {...style({
            "&": join(
              {
                width: fixwidth,
                height: "10%",
                color: th.index.text.primary,
                fontSize: "2.7rem",
                fontFamily: "Noto Serif",
                border: "1px solid",
                borderColor: th.index.text.third,
              },
              g.flexCenter,
            ),
          })}
        >
          Creator's Introdution
        </span>
        <span
          {...style({
            "&": join(
              {
                color: th.index.text.primary,
                height: "max-content",
                width: fixwidth,
                fontSize: "20px",
                margin: "3% 0 3% 0",
                position: "relative",
              },
              g.flexCenter,
            ),
            "& > p": {
              background: th.index.text.faded_primary9,
              width: "45%",
              height: "1px",
            },
            "& > svg": {
              margin: "0 1% 0 1%",
            },
          })}
        >
          <p></p>
          {/*star*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z" />
          </svg>
          <p></p>
        </span>
        <div
          {...style({
            "&": {
              height: "80%",
              width: fixwidth,
              // background: g.debug.background,
            },
          })}
        >
          <Field head="Name" value="Prashant" />
          <Field head="dob" value="10/03/2001" />
          <Field head="qualification" value="MCA" />
          <Field head="Citizenship" value="India" />
          <Field head="Hobies" value="Programming" />
        </div>
      </div>
    </div>
  );
}

export default function Section2() {
  return (
    <section
      {...style({
        "&": join(
          {
            display: "flex",
            alignContent: "center",
            justifyContent: "start",
            height: "100vh",
            outline: g.debug.outline.outline,
          },
          g.full_w,
        ),
      })}
    >
      <IntroductionSection />
    </section>
  );
}
