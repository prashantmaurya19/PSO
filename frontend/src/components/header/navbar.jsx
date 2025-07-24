import { join, merge, style } from "../../css/util";
import th from "../../css/theme";
import g from "../../css/global";
import "react";
import React from "react";
import { Link } from "react-router-dom";

/**
 * @param {{css:import("../../css/util").CssPsedoProperties}}
 */
export const NavButton = ({ css = {}, to = "#", children }) => {
  return (
    <Link
      to={to}
      {...style(
        merge(
          {
            "&": join(
              {
                textDecoration: "none",
                fontFamily: "inherit",
                width: "100px",
                height: "90%",
                borderRadius: "20px",
                color: th.index.text.primary,
                border: `${th.index.second} 1px solid`,
                background: `linear-gradient(0deg,${th.index.primary} 50%, ${th.index.second} 50%)`,
                backgroundSize: "100% 200%",
                marginRight: "10px",
                backgroundPosition: "0% 100%",
                transition: "background 50ms ease-in-out",
              },
              g.flexCenter,
            ),
            hover: {
              color: th.index.text.second,
              backgroundPosition: "0% 0%",
            },
          },
          css,
        ),
      )}
    >
      {children}
    </Link>
  );
};

function NavBar({ children }) {
  return (
    <nav
      {...style({
        "&": join(
          {
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "row",
            height: "4vh",
            color: th.index.text.primary,
          },
          g.full_w,
        ),
      })}
    >
      <span
        style={join({
          display: "flex",
          width: "30%",
          height: "100%",
        })}
      >
        <span
          style={join({
            display: "block",
            background: th.index.third,
            height: "150%",
            aspectRatio: "1",
            borderRadius: "50%",
            translate: "-30% -40%",
          })}
        ></span>
        <p
          style={{
            fontSize: "34px",
            display: "block",
            marginLeft: "-28px",
            zIndex: 1,
          }}
        >
          Shogi.com
        </p>
      </span>
      <span
        style={join({
          padding: "2px 5px 0 2px",
          height: "100%",
          width: "50%",
          display: "flex",
          justifyContent: "end",
        })}
      >
        {children}
      </span>
    </nav>
  );
}

export default NavBar;
