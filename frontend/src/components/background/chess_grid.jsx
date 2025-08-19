import { twMerge } from "tailwind-merge";
import { join, joinTWClass } from "../../util/tailwind";
import { PieceProvider } from "../../stereotype/piece_provider";
import { FontAwesomeChessPieceProvider } from "../../impl/chess_piece_providers";
import { getRandomElement } from "../../util/math";

/**
 * @param {{className:string,chessPieceProvider:PieceProvider}}
 */
export default function ChessGridBG({
  className = "",
  chessPieceProvider = new FontAwesomeChessPieceProvider(),
}) {
  return (
    <div
      className={twMerge(
        join("grid grid-rows-20 grid-cols-20 overflow-hidden"),
        className,
      )}
    >
      {(function () {
        const deg = ["-90", "0"];
        const e = [];
        for (let i = 0; i < 400; i++)
          e.push(
            <span
              key={i}
              className="outline-1 outline-index-third/50 flex justify-center items-center"
            >
              {chessPieceProvider.getRandomePiece(
                i,
                {
                  style: {
                    transform: `rotate(${getRandomElement(deg)}deg)`,
                  },
                  className: joinTWClass(
                    "w-[50%] overflow-hidden aspect-square",
                  ),
                },
                {
                  className: joinTWClass(`fill-index-third/40 `),
                },
              )}
            </span>,
          );
        return e;
      })()}
    </div>
  );
}
