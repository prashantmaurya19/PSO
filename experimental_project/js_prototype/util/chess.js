/**
 * @typedef {[number,number]} BoardCellIndex
 * @typedef {1|-1|0} MotionIndex
 * @typedef {[MotionIndex,MotionIndex]} MotionArray
 * @typedef {Array<FenChar|"">} MotionPathArray
 * @typedef {{path:MotionPathArray,placeable:boolean,check:boolean}} MotionPathInfo
 * @typedef {"b"|"w"} ChessColor
 * @typedef {string} ChessMove
 * @typedef {string} FenPiecePosition
 * @typedef {string} FenString
 * @typedef {string} FenCastlingString
 * @typedef {"k"|"b"|"n"|"r"|"q"|"p"|"K"|"B"|"N"|"R"|"Q"|"P"} FenChar
 * @typedef {string} FenRow
 * @typedef {Array<Array<FenChar|"">>} FenBoard
 * @typedef {Array<Array<number>>} PossibleMoveList
 * @typedef {{piece:FenChar|"",index:number,space:{before:number,after:number}}} FenIndexInfo
 * @typedef {{piece:FenChar|"",en_passant:boolean}} CaptureInfo
 * @typedef {{capture:CaptureInfo,check:boolean,checkmate:boolean,fen:FenPiecePosition}} TransitionInfo
 * @typedef {{b:{k:boolean,q:boolean},w:{k:boolean,q:boolean}}} FenCastlingInfo
 * @typedef {{position:FenPiecePosition,color:ChessColor,en_passant:ChessMove,hall_moves:number,full_moves:number,castling:FenCastlingInfo}} FenInfo
 */

import { indexOfNthOccurrence, splice } from "./astring.js";

const EMPTY_FEN_CHAR = "";
const HYPHEN_FEN_CHAR = "-";

class MotionPath {
  /**
   * @param {number} a - from axis
   * @param {number} b - to axis
   * @return {number}
   */
  static getMotionFromToAxis(a, b) {
    // return (b - a) / Math.abs(b - a);
    // return b - a - 1 + Math.abs(b - a);
    return b - a > 0 ? 1 : b - a < 0 ? -1 : 0;
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @returns {MotionArray}
   */
  static getMotionFromTo(from, to) {
    return [
      MotionPath.getMotionFromToAxis(from[0], to[0]),
      MotionPath.getMotionFromToAxis(from[1], to[1]),
    ];
  }

  /** is motion is on x(col axis) axis or y axis
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isForwardPathY(motion) {
    return motion[1] > 0;
  }

  /** is motion is on x(col axis) axis or y axis
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isForwardPathX(motion) {
    return motion[1] > 0;
  }

  /** is motion is on x(col axis) axis or y axis
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPathY(motion) {
    return motion[1] == 0;
  }

  /** is motion is on x(col axis) axis or y axis
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPathX(motion) {
    return motion[0] == 0;
  }

  /**
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isForwordStraightPath(motion) {
    return (
      (MotionPath.isPathX(motion) || MotionPath.isPathY(motion)) &&
      (MotionPath.isForwardPathX(motion) || MotionPath.isForwardPathY(motion))
    );
  }
}

export class Motion {
  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenPiecePosition} fen
   * @returns {MotionPathInfo}
   */
  static r(from, to, fen) {
    const motion = MotionPath.getMotionFromTo(from, to);
    if (!(MotionPath.isPathY(motion) || MotionPath.isPathX(motion))) {
      return { placeable: false, check: false, path: [] };
    }
    return getPath(from, to, fen);
  }
}

/** return ChessColor p
 * @param {FenChar} p
 * @returns {ChessColor|""}
 */
export function getColor(p) {
  const code = p.charCodeAt(0);
  return code > 64 && code < 91 ? "w" : code > 96 && code < 123 ? "b" : "";
}

/** return true if p1(piece 1) and p2(piece 2) is same color
 * @param {FenChar} p1
 * @param {FenChar} p2
 * @returns {boolean}
 */
export function isSameColorPiece(p1, p2) {
  return getColor(p1) == getColor(p2);
}

/**
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {FenPiecePosition} fen
 * @returns {MotionPathInfo}
 */
export function getPath(from, to, fen) {
  /**
   * @type {MotionPathInfo}
   */
  const res = { path: [], placeable: false, check: false };
  const [a, b] = MotionPath.getMotionFromTo(from, to);
  const from_piece = getPieceAt(...from, fen);
  let istralingspace = true,
    piece = "";
  for (let i = from[1] + b; !isAxisOutOfBound(i); i += b) {
    for (let j = from[0] + a; !isAxisOutOfBound(j); j += a) {
      piece = getPieceAt(j, i, fen);
      res.path.push(piece);
      if (piece != EMPTY_FEN_CHAR) {
        istralingspace = false;
      }
      res.placeable =
        (j == to[0] &&
          i == to[1] &&
          (istralingspace || !isSameColorPiece(from_piece, piece))) ||
        res.placeable;
      res.check = piece.toLowerCase() == "k" || res.check;
      if (a == 0) break;
    }
    if (b == 0) break;
  }
  return res;
}

export function isOutOfBound(x, y) {
  return isAxisOutOfBound(y) || isAxisOutOfBound(x);
}

export function isAxisOutOfBound(x) {
  return x < 0 || x > 7;
}

/**
 * @param {FenCastlingString} fen
 * @returns {FenCastlingInfo}
 */
export function parseCastlingStr(fen) {
  if (fen == "-") {
    return {
      b: {
        k: false,
        q: false,
      },
      w: {
        k: false,
        q: false,
      },
    };
  }
  return {
    b: {
      k: fen.indexOf("k") != -1,
      q: fen.indexOf("q") != -1,
    },
    w: {
      k: fen.indexOf("K") != -1,
      q: fen.indexOf("Q") != -1,
    },
  };
}

/**
 * @param {ChessMove} move
 * @returns {ChessMove}
 */
export function parseEnPasent(move) {
  return move.replace(HYPHEN_FEN_CHAR, "");
}

/** parsing the fen string
 * @param {FenString} fen
 * @returns {FenInfo}
 */
export function parse(fen) {
  const parts = fen.split(" ");
  return {
    position: parts[0],
    color: parts[1],
    castling: parseCastlingStr(parts[2]),
    en_passant: parseEnPasent(parts[3]),
    hall_moves: parseInt(parts[4]),
    full_moves: parseInt(parts[5]),
  };
}

/**
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenPiecePosition} fen
 * @returns {FenIndexInfo}
 */
export function getFenIndexInfo(x, y, fen) {
  let index = indexOfNthOccurrence(fen, "/", y) + 1;
  for (let i = 0; i <= x; i++) {
    let c = parseInt(fen.charAt(index));
    if (Number.isInteger(c)) {
      c--;
      if (c + i >= x)
        return {
          piece: EMPTY_FEN_CHAR,
          index,
          space: { before: x - i, after: c + i - x },
        };
      i += c;
    }
    index++;
  }
  index--;
  return {
    piece: fen.charAt(index),
    index: index,
    space: { before: 0, after: 0 },
  };
}

/** NOTE not checking for index OutOfBound
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenPiecePosition} fen
 * @returns {FenChar|""}
 */
export function getPieceAt(x, y, fen) {
  return getFenIndexInfo(x, y, fen).piece;
}

/** put a piece at x,y and return a new FenPiecePosition
 * @param {FenChar} p
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenPiecePosition} fen
 * @returns {FenPiecePosition}
 */
export function putPieceAt(p, x, y, fen) {
  const info = getFenIndexInfo(x, y, fen);
  return splice(
    fen,
    info.index,
    1,
    `${info.space.before == 0 ? "" : info.space.before}${p}${info.space.after == 0 ? "" : info.space.after}`,
  );
}

/** remove piece from x,y and return new fen string
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenPiecePosition} fen
 * @returns {FenPiecePosition}
 */
export function pickPieceAt(x, y, fen) {
  const info = getFenIndexInfo(x, y, fen);
  if (info.piece == EMPTY_FEN_CHAR) return fen;
  let space = 1,
    start = info.index,
    to = 1;
  const prev = parseInt(fen.charAt(info.index - 1));
  const next = parseInt(fen.charAt(info.index + 1));
  if (Number.isInteger(prev)) {
    space += prev;
    start--;
    to++;
  }
  if (Number.isInteger(next)) {
    space += next;
    to++;
  }
  return splice(fen, start, to, `${space}`);
}

/** return true if played moved is valid
 * @param {ChessMove} from - current cell name
 * @param {ChessMove} to - destination cell name
 * @param {FenPiecePosition} position - current chess position
 */
export function verifyPieceMoved(from, to, position) {
  return true;
}

/**
 * @param {ChessMove} to - destination cell name
 * @param {ChessMove} from - current cell name
 * @param {FenPiecePosition} fen - current chess fen
 * @returns {FenPiecePosition}
 */
export function transition(from, to, fen) {
  const [x, y] = fromMove2Index(from);
  const [a, b] = fromMove2Index(to);
  const info = parse(fen);
  const info_from = getFenIndexInfo(x, y, fen);
  info.en_passant;
  /**
   * @type {TransitionInfo}
   */
  const res = {
    capture: {
      en_passant: info.en_passant == to,
      piece: info_from.piece == "p" ? "P" : "p",
    },
    // TODO: check for checks and checkmate
  };

  if (!verifyPieceMoved(from, to, fen)) return fen;

  return putPieceAt(info_from.piece, a, b, pickPieceAt(x, y, info.position));
}

/** print the fen string
 * @param {FenPiecePosition} position
 * @returns {string}
 */
export function printFen(position) {
  // return printFenBoard(parseFen(position).board);
  let res = "";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      res += `${getPieceAt(j, i, position) == "" ? " " : getPieceAt(j, i, position)} `;
    }
    res += "\n";
  }
  return res;
}

/**
 * @param {FenBoard} board
 * @returns {string}
 */
export function printFenBoard(board) {
  return board
    .map((v) => {
      return v
        .map((v) => {
          return v == "" ? " " : v;
        })
        .join(" ");
    })
    .join("\n");
}

/** return string of chess notation of cell
 * eg 5,3 => e3 ...etc
 * @param {number} x - col number
 * @param {number} y - row number
 * @param {boolean} flip - if board is fliped
 * @returns {string}
 */
export function index2Move(x, y, flip = false) {
  return `${String.fromCharCode(97 + ((flip ? -7 : 0) + x))}${(flip ? -7 : 0) + y + 1}`;
}

/** return a tuple(array of 2 element x,y) where x is col and y is row number
 * @param {ChessMove} m
 * @param {boolean} flip - if board is fliped
 * @returns {BoardCellIndex}
 */
export function fromMove2Index(m, flip = false) {
  return [
    (flip ? -7 : 0) + m.charCodeAt(0) - 97,
    (flip ? -7 : 0) + parseInt(m.charAt(1)) - 1,
  ];
}
