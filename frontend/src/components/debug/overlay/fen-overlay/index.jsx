//@ts-nocheck
import { joinTWClass } from "@pso/util/tailwind";
import { useSelector } from "react-redux";

/**
 * @param {import("@pso/util/jjsx").JSXProps}
 */
export function FenOverlay({}) {
  const board_info = useSelector((s) => s.chess.chess_position);
  const board_info2 = useSelector(
    (s) => s.component_data.chess_board.self.info,
  );
  const display = useSelector(
    (s) => s.component_data.debug.fen_overlay.display,
  );
  if (!display) return <></>;
  return (
    // <div className="absolute left-1/2 top-2">
    <div
      className={joinTWClass(
        "absolute left-[15%] top-3",
        "w-[70%] h-max",
        "bg-white/10 text-white",
        "text-center text-2xl",
        "flex justify-center items-center",
        "p-1.5",
        "rounded-md",
      )}
    >
      Fen1: {board_info.fen}
      <br />
      Fen2: {board_info2.fen}
      <br />
      KingInfo:{" b=> ["}
      {board_info.kings["b"].toString()}
      {"] w=> ["}
      {board_info.kings["w"].toString()}
      {"]"}
    </div>
    // </div>
  );
}
