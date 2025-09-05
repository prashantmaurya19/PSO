/**
 * @typedef {string} ChessMove
 * @typedef {string} FenString
 * @typedef {"k"|"b"|"n"|"r"|"q"|"p"|"K"|"B"|"N"|"R"|"Q"|"P"} FenChar
 * @typedef {string} FenRow
 * @typedef {Array<Array<FenChar|"">>} FenBoard
 * @typedef {{rows:Array<FenRow>,board:FenBoard}} FenInfo
 * @typedef {Array<FenChar|"">} FenRowInfo
 * @typedef {Array<Array<number>>} PossibleMoveList
 * @typedef {{piece:FenChar|"",index:number,space:{before:number,after:number}}} FenIndexInfo
 */

import { indexOfNthOccurrence, splice } from "./astring.js";

const EMPTY_FEN_CHAR = "";

class ChessPieceMotionHelper {
  /**
   * @param {number} x
   * @param {number} y
   * @param {PossibleMoveList} res
   */
  static pushIfNotOutOfBound(x, y, res) {
    if (!isOutOfBound(x, y)) res.push([x, y]);
  }

  static pushDiagonalMove(x, y, res) {
    for (let i = x, j = y; !isOutOfBound(i, j); i++, j++) {
      res.push([i, j]);
    }
    for (let i = x, j = y; !isOutOfBound(i, j); i--, j++) {
      res.push([i, j]);
    }
    for (let i = x, j = y; !isOutOfBound(i, j); i--, j--) {
      res.push([i, j]);
    }
    for (let i = x, j = y; !isOutOfBound(i, j); i++, j--) {
      res.push([i, j]);
    }
  }

  // NOTE: improvment [ insted of i++ or j++ i+=-1 or i+=1]
  static pushStraigthMove(x, y, res) {
    for (let i = x, j = y; !isOutOfBound(i, j); i, j++) {
      res.push([i, j]);
    }
    for (let i = x, j = y; !isOutOfBound(i, j); i, j--) {
      res.push([i, j]);
    }
    for (let i = x, j = y; !isOutOfBound(i, j); i++, j) {
      res.push([i, j]);
    }
    for (let i = x, j = y; !isOutOfBound(i, j); i--, j) {
      res.push([i, j]);
    }
  }
}

/**
 * @typedef {function(number,number):PossibleMoveList} MotionFunction
 * @type {{k:MotionFunction,q:MotionFunction,n:MotionFunction,r:MotionFunction,b:MotionFunction,p:MotionFunction}}
 */
export const ChessPieceMotion = {
  k: (x, y) => {
    const res = [];
    ChessPieceMotionHelper.pushIfNotOutOfBound(x + 1, y, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x - 1, y, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x, y - 1, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x, y + 1, res);
    return res;
  },
  n: (x, y) => {
    const res = [];
    ChessPieceMotionHelper.pushIfNotOutOfBound(x + 1, y - 2, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x - 1, y - 2, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x + 1, y + 2, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x - 1, y + 2, res);

    ChessPieceMotionHelper.pushIfNotOutOfBound(x + 2, y - 1, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x - 2, y - 1, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x + 2, y + 1, res);
    ChessPieceMotionHelper.pushIfNotOutOfBound(x - 2, y + 1, res);
    return res;
  },
  b: (x, y) => {
    const res = [];
    ChessPieceMotionHelper.pushDiagonalMove(x, y, res);
    return res;
  },
  r: (x, y) => {
    const res = [];
    ChessPieceMotionHelper.pushStraigthMove(x, y, res);
    return res;
  },
  q: (x, y) => {
    const res = [];
    ChessPieceMotionHelper.pushDiagonalMove(x, y, res);
    ChessPieceMotionHelper.pushStraigthMove(x, y, res);
    return res;
  },
};

export function isOutOfBound(x, y) {
  return isAxisOutOfBound(y) || isAxisOutOfBound(x);
}

export function isAxisOutOfBound(x) {
  return x < 0 || x > 7;
}

/**
 * @param {FenRow} fen_row
 * @returns {FenRowInfo}
 */
export function parseFenRow(fen_row) {
  const res = [];
  for (let j = 0; j < fen_row.length; j++) {
    const c = parseInt(fen_row.charAt(j));
    if (Number.isInteger(c)) for (let i = 0; i < c; i++) res.push("");
    else res.push(fen_row.charAt(j));
  }
  return res;
}

/**
 * @param {FenString} fen
 * @returns {FenInfo}
 */
export function parseFen(fen) {
  const res = {
    rows: fen.split("/"),
    board: [],
  };

  for (const row of res.rows) {
    res.board.push(parseFenRow(row));
  }

  return res;
}

/**
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenString} fen
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
 * @param {FenString} fen
 * @returns {FenChar|""}
 */
export function getPieceAt(x, y, fen) {
  return getFenIndexInfo(x, y, fen).piece;
}

/** put a piece at x,y and return a new FenString
 * @param {FenChar} p
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenString} fen
 * @returns {FenString}
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
 * @param {FenString} fen
 * @returns {FenString}
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
 * @param {FenString} position - current chess position
 */
export function verifyPieceMoved(from, to, position) {
  const [x, y] = fromMove2Index(from);
  const [a, b] = fromMove2Index(to);
  // TODO: check for collision
  return ChessPieceMotion[getPieceAt(x, y, position).toLowerCase()](
    x,
    y,
  ).reduce((p, c) => {
    return (c[0] == a && c[1] == b) || p;
  }, false);
}

/** NOTE: insted of doing getFenIndexInfo over and over do it
 * once and pass relsute everyware
 * @param {ChessMove} to - destination cell name
 * @param {ChessMove} from - current cell name
 * @param {FenString} fen - current chess fen
 * @returns {FenString}
 */
export function transition(from, to, fen) {
  const [x, y] = fromMove2Index(from);
  const [a, b] = fromMove2Index(to);

  if (!verifyPieceMoved(from, to, fen)) return fen;

  return putPieceAt(
    getFenIndexInfo(x, y, fen).piece,
    a,
    b,
    pickPieceAt(x, y, fen),
  );
}

/** print the fen string
 * @param {FenString} position
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
 * @returns {Array<Number>}
 */
export function fromMove2Index(m, flip = false) {
  return [
    (flip ? -7 : 0) + m.charCodeAt(0) - 97,
    (flip ? -7 : 0) + parseInt(m.charAt(1)) - 1,
  ];
}
