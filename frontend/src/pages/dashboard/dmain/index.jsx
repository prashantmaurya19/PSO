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
        joinTWClass(
          "flex justify-center items-center flex-col gap-7",
          "absolute",
        ),
      )}
    >
      <BliztPlayMenuButton />
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

/**
 * @param {import("../../../util/jjsx").JSXElement} p0
 */
export function ChessPlayGround({ className = "", ...a }) {
  return (
    <ContextContainer
      {...a}
      className={twMerge(
        joinTWClass(
          "flex",
          "justify-center",
          "items-center",
          "absolute",
          "opacity-0 z-0",
          "data-subview:opacity-100",
          "data-subview:z-500",
        ),
        className,
      )}
    >
      <span className="text-white text-2xl font-DM_Sans">blank</span>
    </ContextContainer>
  );
}
