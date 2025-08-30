import { twMerge } from "tailwind-merge";
import { ContextContainer } from "../../../components/page/context-container";
import { joinTWClass } from "../../../util/tailwind";
import {
  BliztPlayMenuButton,
  NewBotPlayMenuButon,
  NewGamePlayMenuButon,
} from "../../../components/buttons/dmenu-button";
import { useNavigate } from "react-router-dom";

/**
 * @param {import("../../../util/jjsx").JSXElement} param0
 */
export function StartUpMenu({ className = "", ...opt }) {
  const navigate = useNavigate();
  return (
    <ContextContainer
      {...opt}
      className={twMerge(
        className,
        joinTWClass("flex justify-center items-center flex-col gap-7"),
      )}
    >
      <BliztPlayMenuButton
        onClick={() => {
          navigate("/dashboard/chess_arena", { state: { auth: true } });
        }}
      />
      <NewGamePlayMenuButon
        onClick={() => {
          navigate("/dashboard/new_game", { state: { auth: true } });
        }}
      />
      <NewBotPlayMenuButon
        onClick={() => {
          navigate("/dashboard/new_bot_game", { state: { auth: true } });
        }}
      />
    </ContextContainer>
  );
}
