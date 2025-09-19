//@ts-nocheck
import { joinTWClass } from "@pso/util/tailwind";
import { twMerge } from "tailwind-merge";
import { VersesBanner } from "@pso/components/chess-arena/move-list-panel/verses-banner";
import { MoveListTable } from "@pso/components/chess-arena/move-list-panel/move-list-table";
import { MoveListFunctionButtons } from "@pso/components/chess-arena/move-list-panel/move-list-function-button";
import { OponentRequestField } from "./oponent-request";
import { useSelector } from "react-redux";

/**
 * @param {import("@pso/util/jjsx").JSXProps} p
 */
export function MoveListPanel({ className = "", ...a }) {
  const player_info = useSelector((s) => s.chess.players_data);
  const option = useSelector((s) => s.component_data.move_list_panel);
  if (!option.display) return <></>;
  return (
    <div
      {...a}
      className={twMerge(
        joinTWClass(
          "grow-1 h-[50%]",
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
      <MoveListTable table_data={option.move_list} />
      <MoveListFunctionButtons />
      <OponentRequestField title={option.request.title} />
    </div>
  );
}
