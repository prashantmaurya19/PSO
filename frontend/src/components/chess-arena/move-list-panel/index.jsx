//@ts-nocheck
import { joinTWClass } from "@pso/util/tailwind";
import { twMerge } from "tailwind-merge";
import { VersesBanner } from "@pso/components/chess-arena/move-list-panel/verses-banner";
import { MoveListTable } from "@pso/components/chess-arena/move-list-panel/move-list-table";
import {
  GameStateViceMoveListFunctionButtons,
  MoveListFunctionButtons,
  MoveListTableFunctionButtons,
} from "@pso/components/chess-arena/move-list-panel/move-list-function-button";
import { OponentRequestField } from "./oponent-request";
import { useSelector } from "react-redux";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function MoveListPanel({ className = "", ...a }) {
  const player_info = useSelector((s) => s.chess.players_data);
  const display = useSelector((s) => s.component_data.move_list_panel.display);
  if (!display) return <></>;
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "grow-1 h-[60%]",
          "border-2 border-emerald-800 border-solid",
          "ml-1",
          "*:border-b-gray-500 *:border-solid *:border-b-2",
        ),
        className,
      )}
    >
      <VersesBanner
        player_name={player_info.p.name}
        oponent_name={player_info.o.name}
      />
      <MoveListTable />
      <MoveListTableFunctionButtons />
      <GameStateViceMoveListFunctionButtons />
      <OponentRequestField />
    </div>
  );
}
