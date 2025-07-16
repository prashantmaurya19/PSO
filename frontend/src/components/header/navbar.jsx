// import { css } from "@emotion/css";
import d from "../../css/debug";
import u from "../../css/util";
import "react";

function NavBar() {
  return (
    <nav
      style={u.join({
        display: "flex",
        justifyContent: "start",
        width: "100%",
        height: "40px",
      },d.outline)}
    >
      <span
        style={{
          display: "block",
          background: "red",
          height: "150%",
          aspectRatio: "1",
          borderRadius: "50%",
          translate: "-30% -40%",
        }}
      ></span>
      <span>Shogi.com</span>
    </nav>
  );
}

export default NavBar;
