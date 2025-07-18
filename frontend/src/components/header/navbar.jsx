// import d from "../../css/debug";
import { join, merge, style } from "../../css/util";
import th from "../../css/theme";
import "react";
import React from "react";

/**
 * @param {{css:import("../../css/util").CssPsedoProperties}}
 */
export const NavButton = ({ css = {}, children }) => {
  return (
    <button
      {...style(
        merge(
          {
            "&": {
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
    </button>
  );
};

function NavBar() {
  return (
    <nav
      {...style({
        "&": join({
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "row",
          width: "100%",
          height: "40px",
          color: th.index.text.primary,
        }),
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
        <NavButton>Home</NavButton>
        <NavButton>About</NavButton>
        <NavButton
          css={{
            "&": {
              borderColor: th.index.third,
              background: `linear-gradient(0deg,${th.index.primary} 50%, ${th.index.third} 50%)`,
              color: th.index.third,
            },
	    hover:{
              color: th.index.text.primary,
	    }
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
	    hover:{
              color: th.index.text.primary,
	    }
          }}
        >
          sign Up
        </NavButton>
      </span>
    </nav>
  );
}

export default NavBar;
