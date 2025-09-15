// @ts-nocheck
import { LoginButton, SignUpButton } from "@pso/components/buttons/navbutton";
import { LeftSection, RightSlogan } from "@pso/pages/main/sections";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { getAnimation } from "@pso/util/animator";
import NavBar from "@pso/components/header/navbar";
import { anime } from "@pso/util/anime";
import { useRef } from "react";

export default function IndexPage() {
  const navigate = useNavigate();
  const chessboard = useRef(null);

  const { contextSafe } = useGSAP(async () => {
    // await getAnimation("main.open").get();
    await anime()
      .mainRightSlogan("from", ".main-right")
      .mainLeftChessBoard("from", "#main-left-chess_board")
      .build();
  });

  return (
    <div className="bg-bg w-[100vw] h-[100vh] flex justify-center items-center flex-col">
      <NavBar>
        <SignUpButton
          onClick={contextSafe(async function (e) {
            e.preventDefault();
            await anime()
              .mainRightSlogan("to", ".main-right")
              .mainLeftChessBoard("to", "#main-left-chess_board")
              .build();
            navigate("/register");
          })}
          text="sign Up"
        />
        <LoginButton
          onClick={contextSafe(async function (e) {
            e.preventDefault();
            await anime()
              .mainRightSlogan("to", ".main-right")
              .mainLeftChessBoard("to", "#main-left-chess_board")
              .build();
            navigate("/login");
          })}
          text="login"
        />
      </NavBar>
      <section className="flex flex-row items-center justify-between w-full grow-1 overflow-hidden">
        <LeftSection />
        <RightSlogan />
      </section>
    </div>
  );
}
