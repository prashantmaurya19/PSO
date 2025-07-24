import th from "../../css/theme";
import g from "../../css/global";
import { join, merge, style } from "../../css/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

/**  
 * @param {{css:import("../../css/util").CssPsedoProperties}}
*/
function Group({ css = {}, children }) {
  return (
    <span
      {...style(
        merge(
          {
            "&": join(
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                flexDirection: "column",
                width: "35%",
              },
              g.full_h,
            ),
          },
          css,
        ),
      )}
    >
      {children}
    </span>
  );
}

function Field({ css = {}, icon, field_name = "", value = "", href = "" }) {
  return (
    <span
      {...style(
        merge(
          {
            "&": join(
              {
                height: "30%",
                fontSize: "1.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              },
              g.full_w,
            ),
            "& > p": join({
              margin: "0 1% 0 0",
              color: th.index.text.primary,
            }),
            "& > a": join({
              margin: "0 0 0 1%",
              color: th.index.text.primary,
              textDecoration: "none",
            }),
          },
          css,
        ),
      )}
    >
      {icon}
      <p>{field_name}</p>:<a href={href}>{value}</a>
    </span>
  );
}

export default function InfoFooter() {
  return (
    <div
      {...style({
        "&": join(
          {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "20vh",
          },
          g.full_w,
        ),
      })}
    >
      <Group
        css={{
          "&": {},
        }}
      >
        <Field
          css={{
            "&": {
              color: th.index.text.primary,
            },
          }}
          icon={
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{
                margin: "0 2% 0 2%",
              }}
            />
          }
          field_name="Email"
          value="Prashantmaurya1009@gmail.com"
        />
        <Field
          css={{
            "&": {
              color: th.index.text.primary,
            },
          }}
          icon={
            <FontAwesomeIcon
              icon={faLinkedin}
              style={{
                margin: "0 2% 0 2%",
              }}
            />
          }
          field_name="Linkedin"
          value="Prashant Maurya"
          href="www.linkedin.com/in/prashant-maurya-68645b199"
        />
      </Group>
      <Group
        // css={{
        //   "&": { justifyContent:"end" },
        // }}
      >
        <Field
          css={{
            "&": {
              color: th.index.text.primary,
            },
          }}
          icon={
            <FontAwesomeIcon
              icon={faGithub}
              style={{
                margin: "0 2% 0 2%",
              }}
            />
          }
          field_name="Github"
          value="prashantmaurya19"
          href="https://github.com/prashantmaurya19/PSO"
        />
      </Group>
    </div>
  );
}
