import { twMerge } from "tailwind-merge";
import { join } from "../../util/tailwind";
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
        join("w-full h-full grid grid-rows-10 grid-cols-40 overflow-hidden"),
        className,
      )}
    >
      {(function () {
        const deg = ["45","-45"];
        const e = [];
        for (let i = 0; i < 400; i++)
          e.push(
            chessPieceProvider.getRandomePiece(
              i,
              {
                style: {
                  transform: `rotate(${getRandomElement(deg)}deg)`,
                },
                className: join("w-3/4 h-3/4 overflow-hidden"),
              },
              {
                className: join(`fill-index-third/40 `),
              },
            ),
          );
        return e;
      })()}
    </div>
  );
}
