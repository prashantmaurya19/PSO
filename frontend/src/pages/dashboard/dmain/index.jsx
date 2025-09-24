import { twMerge } from "tailwind-merge";
import { ContextContainer } from "@pso/components/page/context-container";
import { joinTWClass } from "@pso/util/tailwind";
import {
  DirectPlayMenuButton,
  NewBotPlayMenuButon,
  NewGamePlayMenuButon,
} from "@pso/components/buttons/dmenu-button";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { pmlog } from "@pso/util/log";

/**
 * @param {import("@pso/util/jjsx").JSXProps} param0
 */
export function StartUpMenu({ className = "", ...opt }) {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state == undefined) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <ContextContainer
      {...opt}
      className={twMerge(
        className,
        joinTWClass("flex justify-center items-center flex-col gap-7"),
      )}
    >
      <DirectPlayMenuButton
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
