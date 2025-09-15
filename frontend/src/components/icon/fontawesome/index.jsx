import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChessBishop as faChessBishopSolid,
  faChessKing as faChessKingSolid,
  faChessKnight as faChessKnightSolid,
  faChessPawn as faChessPawnSolid,
  faChessQueen as faChessQueenSolid,
  faChessRook as faChessRookSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { renderToString } from "react-dom/server";
import { twMerge } from "tailwind-merge";
import { joinTWClass } from "@pso/util/tailwind";
/**
 * @typedef {"k"|"b"|"n"|"r"|"q"|"p"|"K"|"B"|"N"|"R"|"Q"|"P"} FenChar
 * @param {{fenChar:FenChar,iconProps:Partial<FontAwesomeIconProp>} & ReactImgProps } p0
 */
export function FontAwesomeChessPiece({ fenChar = "p", iconProps = {}, ...a }) {
  const icon = (function () {
    switch (fenChar) {
      case "K":
        return faChessKing;
      case "R":
        return faChessRook;
      case "B":
        return faChessBishop;
      case "N":
        return faChessKnight;
      case "Q":
        return faChessQueen;
      case "P":
        return faChessPawn;
      case "k":
        return faChessKingSolid;
      case "r":
        return faChessRookSolid;
      case "b":
        return faChessBishopSolid;
      case "n":
        return faChessKnightSolid;
      case "q":
        return faChessQueenSolid;
      case "p":
        return faChessPawnSolid;
    }
  })();
  return (
    <FontAwesomeIconDiv
      {...a}
      draggable
      data-piecename={fenChar}
      iconProps={{ ...iconProps, size: "2xs", icon }}
    />
  );
}

/**
 * @typedef {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} ReactImgProps
 * @typedef {import("@fortawesome/react-fontawesome").FontAwesomeIconProps & React.RefAttributes<SVGSVGElement>} FontAwesomeIconProp
 * @param {{iconProps:FontAwesomeIconProp} & ReactImgProps}
 */
export function FontAwesomeIconImg({ iconProps = {}, ...a }) {
  const src = `data:image/svg+xml,${renderToString(
    <FontAwesomeIcon {...iconProps} />,
  )
    .replace(/\sdata-prefix.*="img"/g, "")
    .replace(
      'aria-hidden="true"',
      'aria-hidden="true" xmlns="http://www.w3.org/2000/svg"',
    )}`;
  return <img {...a} src={src} />;
}

/**
 * @typedef {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} ReactImgProps
 * @typedef {import("@fortawesome/react-fontawesome").FontAwesomeIconProps & React.RefAttributes<SVGSVGElement>} FontAwesomeIconProp
 * @param {{iconProps:FontAwesomeIconProp} & ReactImgProps}
 */
export function FontAwesomeIconDiv({ iconProps = {}, className, ...a }) {
  const src = `data:image/svg+xml,${renderToString(
    <FontAwesomeIcon {...iconProps} />,
  )
    .replace(/\sdata-prefix.*="img"/g, "")
    .replace(
      'aria-hidden="true"',
      'aria-hidden="true" xmlns="http://www.w3.org/2000/svg"',
    )}`;
  return (
    <div
      {...a}
      className={twMerge(
        className,
        "bg-center",
        "bg-no-repeat bg-size-[70%_85%]",
      )}
      style={{
        backgroundImage: `url('${src}')`,
      }}
    ></div>
  );
}
