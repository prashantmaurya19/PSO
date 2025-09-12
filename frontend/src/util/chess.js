/**
 * @typedef {"diagonal"|"straight"|"knight"} MotionType
 * @typedef {Record<ChessColor,BoardCellIndex>} BoardKingsIndexInfo
 * @typedef {Record<ChessColor,{k:boolean,q:boolean}>} FenCastlingInfo
 * @typedef {Array<FenChar>} AttackingPieceList
 * @typedef {""} EmptyFen
 * @typedef {FenChar|EmptyFen} FenCharWithEmptyFen
 * @typedef {[number,number]} BoardCellIndex
 * @typedef {number} MotionIndex
 * @typedef {[MotionIndex,MotionIndex]} MotionArray
 * @typedef {Array<FenCharWithEmptyFen>} MotionPathArray
 * @typedef {MotionMap<Object<string,MotionPathInfo>> & {piece:FenCharWithEmptyFen}} IndexInfo
 * @typedef {"b"|"w"} ChessColor
 * @typedef {string} ChessMove
 * @typedef {string} FenPiecePosition
 * @typedef {string} FenString
 * @typedef {string} FenCastlingString
 * @typedef {"k"|"b"|"n"|"r"|"q"|"p"|"K"|"B"|"N"|"R"|"Q"|"P"} FenChar
 * @typedef {string} FenRow
 * @typedef {Array<Array<FenCharWithEmptyFen>>} FenBoard
 * @typedef {Array<Array<number>>} PossibleMoveList
 */
/**
 * @typedef {object} CastlingInfo
 * @property {PieceMotionInfo} king Information about the king's motion during castling.
 * @property {PieceMotionInfo} rook Information about the rook's motion during castling.
 */
/**
 * @typedef {Object} AttackingPieceInfo
 * @property {FenCharWithEmptyFen} piece
 * @property {AttackingPieceList} list
 */
/**
 * @template T
 * @typedef {Record<MotionType,T>} MotionMap
 */

/**
 * @typedef {object} PieceMotionInfo
 * @property {BoardCellIndex} from The starting board cell index.
 * @property {BoardCellIndex} to The ending board cell index.
 * @property {FenPiecePosition} position The FEN position of the piece after the move.
 */
/**
 * @typedef {object} CaptureInfo
 * @property {FenCharWithEmptyFen} piece The FEN character of the captured piece, or an empty string.
 * @property {boolean} en_passant A boolean indicating if the capture was an en passant move.
 */
/**
 * @typedef {object} FenIndexInfo
 * @property {FenCharWithEmptyFen} piece The FEN character of the piece, or an empty string if no piece is present.
 * @property {number} index The index within the FEN string.
 * @property {{before:number,after:number}} space An object containing the number of empty spaces before and after the piece.
 */
/**
 * @typedef {object} BoardCellIndexInfo
 * @property {FenChar} piece The FEN character of the piece.
 * @property {BoardCellIndex} index The index of the board cell.
 */
/**
 * @typedef {object} BoardInfo
 * @property {FenString} fen The FEN string representing the board's state.
 * @property {BoardKingsIndexInfo} kings An object containing the board cell index for the white and black kings.
 */
/**
 * @typedef {object} TransitionInfo
 * @property {CaptureInfo} capture - Information about a capture, if any occurred.
 * @property {boolean} check - Indicates if the move results in a check.
 * @property {boolean} checkmate - Indicates if the move results in a checkmate.
 * @property {FenPiecePosition} fen - The FEN position of the piece after the move.
 * @property {CastlingInfo} castling - Information about castling rights.
 */
/**
 *
 * @typedef {Object} FenInfo
 * @property {FenCastlingInfo} castling
 * @property {number} full_moves
 * @property {number} hall_moves
 * @property {ChessMove} en_passant
 * @property {ChessColor} color
 * @property {FenPiecePosition} position
 * /
/**
 * @typedef {Object} MotionPathInfo
 * @property {BoardCellIndex} [ en_passant ]
 * @property {BoardCellIndex} [ from ]
 * @property {BoardCellIndex} [ to ]
 * @property {MotionArray} [ motion ]
 * @property {Object<string,object|CastlingInfo>} cases
 * @property {BoardCellIndexInfo} [ blocking_piece ]
 * @property {object} [ debug ]
 * @property {FenCharWithEmptyFen} piece
 * @property {boolean} placeable
 * @property {number} empty_space
 */

import { putIfUndefined } from "./aobject.js";
import {
  indexOfNthOccurrence,
  isLowerCase,
  isUpperCase,
  splice,
} from "./astring.js";
import { log, pmlog } from "./log.js";

export const EMPTY_FEN_CHAR = "";
export const HYPHEN_FEN_CHAR = "-";
/**
 * @type {Array<FenChar>}
 */
export const PROMOTION_PIECES = ["q", "r", "b", "n"];

export class MotionPath {
  /**
   * @type {MotionMap<Array<Array<number>>>}
   */
  static PATHS = {
    diagonal: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ],
    straight: [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ],
    knight: [
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ],
  };

  /**
   * @param {number} a - axis
   * @returns {number}
   */
  static absoluteMotion2UnitMotionAxis(a) {
    return a / Math.max(1, Math.abs(a));
  }

  /**
   * @param {MotionArray} motion
   * @returns {MotionArray}
   */
  static absoluteMotion2UnitMotion(motion) {
    return [
      MotionPath.absoluteMotion2UnitMotionAxis(motion[0]),
      MotionPath.absoluteMotion2UnitMotionAxis(motion[1]),
    ];
  }

  /**
   * @param {number} a - from axis
   * @param {number} b - to axis
   * @returns {number}
   */
  static getMotionFromToAxis(a, b) {
    return b - a;
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

  /** is motion is on y(row axis) axis
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isForwardPathY(motion) {
    return motion[1] > 0;
  }

  /** forward motion in x(col axis) axis
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isForwardPathX(motion) {
    return motion[0] > 0;
  }

  /** is motion is on x(col axis)
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPathX(motion) {
    return motion[1] == 0;
  }

  /** is motion is on y(row axis)
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPathY(motion) {
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

  /**
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isDiagonal(motion) {
    return Math.abs(motion[0]) == Math.abs(motion[1]);
  }

  /**
   * @param {number} a
   * @returns {boolean}
   */
  static isKnightPathAxis(a) {
    return -2 < a && a < 2;
  }

  /**
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isKingPath(motion) {
    return motion.reduce((p, c) => {
      return MotionPath.isKnightPathAxis(c) && p;
    }, true);
  }

  /**
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isCastling(motion) {
    return motion[1] == 0 && Math.abs(motion[0]) == 2;
  }

  /**
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isKnightPath(motion) {
    return (
      (Math.abs(motion[0]) == 1 && Math.abs(motion[1]) == 2) ||
      (Math.abs(motion[1]) == 1 && Math.abs(motion[0]) == 2)
    );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPawnMoveP(from, motion) {
    return (
      this.isPathY(motion) &&
      ((from[1] == 6 && motion[1] == -2) || motion[1] == -1)
    );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPawnMovep(from, motion) {
    return (
      this.isPathY(motion) &&
      ((from[1] == 1 && motion[1] == 2) || motion[1] == 1)
    );
  }

  /**
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPawnCapturep(motion) {
    return this.isDiagonal(motion) && this.isForwardPathY(motion);
  }

  /**
   * @param {MotionArray} motion
   * @returns {boolean}
   */
  static isPawnCaptureP(motion) {
    return this.isDiagonal(motion) && !this.isForwardPathY(motion);
  }

  /** get path for knight according to index
   * @param {BoardCellIndex} index
   * @returns {Array<BoardCellIndex>}
   */
  static getKinghtPath(index) {
    const [i, j] = index;
    /**
     * @type {Array<BoardCellIndex>}
     */
    const res = [];
    if (!isOutOfBound(i + 2, j + 1)) res.push([i + 2, j + 1]);
    if (!isOutOfBound(i + 2, j - 1)) res.push([i + 2, j - 1]);
    if (!isOutOfBound(i - 2, j + 1)) res.push([i - 2, j + 1]);
    if (!isOutOfBound(i - 2, j - 1)) res.push([i - 2, j - 1]);
    if (!isOutOfBound(i - 1, j + 2)) res.push([i - 1, j + 2]);
    if (!isOutOfBound(i - 1, j - 2)) res.push([i - 1, j - 2]);
    if (!isOutOfBound(i + 1, j + 2)) res.push([i + 1, j + 2]);
    if (!isOutOfBound(i + 1, j - 2)) res.push([i + 1, j - 2]);
    return res;
  }
}

export class Motion {
  /**
   * @returns {MotionPathInfo}
   */
  static getEmptyMovePathInfo() {
    return {
      placeable: false,
      piece: EMPTY_FEN_CHAR,
      empty_space: 0,
      cases: { place: {} },
    };
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @param {MotionArray} motion
   * @param {boolean} not_verify
   * @returns {MotionPathInfo}
   */
  static #getPathHelper(from, to, info, motion, not_verify) {
    return not_verify
      ? this.getEmptyMovePathInfo()
      : getPathInfoByMotion(
          from,
          to,
          MotionPath.absoluteMotion2UnitMotion(motion),
          info.position,
        );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static n(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    if (!MotionPath.isKnightPath(motion)) {
      return this.getEmptyMovePathInfo();
    }
    return getKnightPathInfo(from, to, info.position);
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static k(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    if (
      !(
        (MotionPath.isCastling(motion) || MotionPath.isKingPath(motion)) &&
        pmlog(
          isSafeForPiece(getPieceAt(...from, info.position), to, info.position),
        )
      )
    ) {
      return this.getEmptyMovePathInfo();
    }
    const res = getKingPathInfo(from, to, info.position);
    putIfUndefined(res.cases, "king_move", { to });
    if (
      MotionPath.isCastling(motion) &&
      isSafePathForPiece(res.piece, from, to, info.position, {
        from: false,
        to: false,
      })
    ) {
      putIfUndefined(res.cases, "castling", {});
      if (motion[0] > 0 && info.castling[info.color].k) {
        res.cases.castling.rook = Handler.CASTLING_ROOK_INDEX[res.piece]().k;
      } else if (motion[0] < 0 && info.castling[info.color].q) {
        res.cases.castling.rook = Handler.CASTLING_ROOK_INDEX[res.piece]().q;
      }
    }
    return res;
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static K(from, to, info) {
    return this.k(from, to, info);
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} fen
   * @returns {MotionPathInfo}
   */
  static N(from, to, fen) {
    return this.n(from, to, fen);
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static P(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    return Motion.#getPathHelper(
      from,
      to,
      info,
      motion,
      !(
        MotionPath.isPawnMoveP(from, motion) ||
        (MotionPath.isPawnCaptureP(motion) &&
          getPieceAt(...to, info.position) != EMPTY_FEN_CHAR)
      ),
    );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static p(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    return Motion.#getPathHelper(
      from,
      to,
      info,
      motion,
      !(
        MotionPath.isPawnMovep(from, motion) ||
        (MotionPath.isPawnCapturep(motion) &&
          getPieceAt(...to, info.position) != EMPTY_FEN_CHAR)
      ),
    );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} fen
   * @returns {MotionPathInfo}
   */
  static Q(from, to, fen) {
    return this.q(from, to, fen);
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static q(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    return Motion.#getPathHelper(
      from,
      to,
      info,
      motion,
      !(
        MotionPath.isPathY(motion) ||
        MotionPath.isPathX(motion) ||
        MotionPath.isDiagonal(motion)
      ),
    );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static r(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    return Motion.#getPathHelper(
      from,
      to,
      info,
      motion,
      !(MotionPath.isPathY(motion) || MotionPath.isPathX(motion)),
    );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static R(from, to, info) {
    return Motion.r(from, to, info);
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static b(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    return Motion.#getPathHelper(
      from,
      to,
      info,
      motion,
      !MotionPath.isDiagonal(motion),
    );
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} fen
   * @returns {MotionPathInfo}
   */
  static B(from, to, fen) {
    return this.b(from, to, fen);
  }
}

/** return b if current_color is w and vise-versa
 * @param {ChessColor} current_color
 * @returns {ChessColor}
 */
export function toggleColor(current_color) {
  return current_color == "b" ? "w" : "b";
}

/** return ChessColor p
 * @param {FenCharWithEmptyFen} p
 * @returns {ChessColor|EmptyFen}
 */
export function getColor(p) {
  return isUpperCase(p) ? "w" : isLowerCase(p) ? "b" : "";
}

/** return true if p1(piece 1) and p2(piece 2) is same color
 * @param {FenCharWithEmptyFen} p1
 * @param {FenCharWithEmptyFen} p2
 * @returns {boolean}
 */
export function isSameColorPiece(p1, p2) {
  return getColor(p1) == getColor(p2);
}

class Handler {
  /**
   * @type {Record<"k"|"K",function():{ k: { from: [number, number], to: [number, number] }, q: { to: [number, number], from: [number, number] } }>}
   */
  static CASTLING_ROOK_INDEX = {
    k: function () {
      return {
        k: { from: [7, 0], to: [5, 0] },
        q: { from: [0, 0], to: [3, 0] },
      };
    },
    K: function () {
      return {
        k: { from: [7, 7], to: [5, 7] },
        q: { from: [0, 7], to: [3, 7] },
      };
    },
  };

  /**
   * @type {Object<string,function({from:BoardCellIndex,to:BoardCellIndex,move_info:MotionPathInfo,fen_info:FenInfo,new_fen_info:FenInfo,transition_info:TransitionInfo,king_info:BoardKingsIndexInfo,info:object|CastlingInfo}):void|"failed">}
   */
  static PLAYED_MOTION_PATH_INFO = {
    place: function ({ move_info, fen_info, king_info, new_fen_info }) {
      if (
        move_info == undefined ||
        !move_info.placeable ||
        fen_info.color != getColor(move_info.piece)
      ) {
        return "failed";
      }
      const new_position = pickAndPutPieceAt(
        move_info.from,
        move_info.to,
        fen_info.position,
      );
      if (
        (move_info.piece.toLowerCase() != "k" &&
          !isSafeForPiece(
            move_info.piece,
            king_info[fen_info.color],
            new_position,
          )) ||
        new_position == fen_info.position
      ) {
        return "failed";
      }
      new_fen_info.position = new_position;
    },
    king_move: function ({ fen_info, new_fen_info, king_info, info }) {
      new_fen_info.castling[new_fen_info.color] = { k: false, q: false };
      king_info[fen_info.color] = info.to;
    },
    castling: function ({ new_fen_info, info }) {
      new_fen_info.position = pickAndPutPieceAt(
        info.rook.from,
        info.rook.to,
        new_fen_info.position,
      );
    },
  };

  /**
   * @type {MotionMap<function({motion_type:MotionType,color:ChessColor,info:MotionPathInfo}):undefined|FenChar>}
   */
  static IS_PIECE_ATTACKING = {
    knight: function ({ motion_type, color, info }) {
      const piece = info.blocking_piece?.piece.toLowerCase();
      if (piece == undefined || piece == EMPTY_FEN_CHAR) return;
      //@ts-ignore
      if (getColor(info.blocking_piece?.piece) == color) return;
      pmlog(
        getColor(info.blocking_piece?.piece),
        info.blocking_piece?.piece,
        color,
        info.from,
        info.to,
        info.motion,
      );
      if (piece == "n") {
        return info.blocking_piece?.piece;
      }
    },
    diagonal: function ({ color, info }) {
      const piece = info.blocking_piece?.piece.toLowerCase();
      if (piece == undefined || piece == EMPTY_FEN_CHAR) return;
      //@ts-ignore
      if (getColor(info.blocking_piece?.piece) == color) return;
      if (piece == "q" || piece == "b") {
        return info.blocking_piece?.piece;
      } else if (piece == "k" && info.empty_space == 0) {
        return info.blocking_piece?.piece;
      } else if (
        piece == "p" &&
        info.empty_space == 0 &&
        MotionPath[
          `isPawnCapture${isUpperCase(info.blocking_piece.piece) ? "p" : "P"}`
        ](info.motion)
      ) {
        return info.blocking_piece?.piece;
      }
      // pmlog(
      //   info.blocking_piece.piece,
      //   info.empty_space,
      //   info.motion,
      //   MotionPath[
      //     `isPawnCapture${isUpperCase(info.blocking_piece.piece) ? "p" : "P"}`
      //   ](info.motion),
      // );
    },
    straight: function ({ color, info }) {
      const piece = info.blocking_piece?.piece.toLowerCase();
      if (piece == undefined || piece == EMPTY_FEN_CHAR) return;
      //@ts-ignore
      if (getColor(info.blocking_piece?.piece) == color) return;
      if (
        piece == "q" ||
        piece == "r" ||
        (piece == "k" && info.empty_space == 0)
      ) {
        return info.blocking_piece?.piece;
      }
    },
  };
}

/** return array of piecies that can attack or reach
 * @param {ChessColor|EmptyFen} player_color
 * @param {IndexInfo} index_info
 * @returns {AttackingPieceInfo}
 */
export function getAllAttackPiece(player_color, index_info) {
  /**
   * @type {AttackingPieceList}
   */
  const res = [];
  for (const motion_type in Handler.IS_PIECE_ATTACKING) {
    for (const i in index_info[motion_type]) {
      const attack_piece = Handler.IS_PIECE_ATTACKING[motion_type]({
        motion_type,
        color: player_color,
        info: index_info[motion_type][i],
      });
      if (attack_piece) res.push(attack_piece);
    }
  }
  return {
    list: res,
    piece: index_info.piece,
  };
}

/**  
 * 
*/
export function isCheckMate(){

}

/**
 * @param {FenCharWithEmptyFen} piece
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {FenPiecePosition} position
 * @param {{from:boolean,to:boolean}} include
 * @returns {boolean}
 */
export function isSafePathForPiece(
  piece,
  from,
  to,
  position,
  include = { from: false, to: true },
) {
  return isSafePathByColor(getColor(piece), from, to, position, include);
}

/**
 * @param {ChessColor|EmptyFen} color
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {FenPiecePosition} position
 * @param {{from:boolean,to:boolean}} include
 * @returns {boolean}
 */
export function isSafePathByColor(
  color,
  from,
  to,
  position,
  include = { from: false, to: true },
) {
  const motion = MotionPath.absoluteMotion2UnitMotion(
    MotionPath.getMotionFromTo(from, to),
  );
  let safe = true;
  streamFenIndexInfoFromTo(
    from,
    to,
    motion,
    (i, j) => {
      if (!isSafeAtByColor(color, [i, j], position)) {
        safe = false;
        return "break";
      }
    },
    {
      ...include,
      infinite: false,
    },
  );
  return safe;
}

/**
 * @param {ChessColor|EmptyFen} color
 * @param {BoardCellIndex} index
 * @param {FenPiecePosition} position
 * @returns {boolean}
 */
export function isSafeAtByColor(color, index, position) {
  return (
    getAllAttackPiece(color, getIndexInfoInAllMotion(index, position)).list
      .length == 0
  );
}

/** return true if given is safe at index otherwise false
 * @param {FenCharWithEmptyFen} piece
 * @param {BoardCellIndex} index
 * @param {FenPiecePosition} position
 * @returns {boolean}
 */
export function isSafeForPiece(piece, index, position) {
  return isSafeAtByColor(getColor(piece), index, position);
}

/** return info about the oponent pieces who can reach and attack
 * @param {BoardCellIndex} index
 * @param {FenPiecePosition} fen
 * @param {Partial<Record<MotionType,true>>} [exclude_motion_type={}]
 * @returns {IndexInfo}
 */
export function getIndexInfoInAllMotion(index, fen, exclude_motion_type = {}) {
  /**
   * @type {IndexInfo}
   */
  const res = { diagonal: {}, straight: {}, knight: {}, piece: "" };
  /**
   * @type {BoardCellIndex}
   */
  const to = [-1, -1];
  for (const path_type in MotionPath.PATHS) {
    if (exclude_motion_type[path_type]) continue;
    for (const motion of MotionPath.PATHS[path_type]) {
      res[path_type][motion] = getPathInfoByMotionType(
        //@ts-ignore
        path_type,
        index,
        to,
        motion,
        fen,
      );

      res.piece = res[path_type][motion].piece;
    }
  }
  return res;
}

/**
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {FenPiecePosition} fen
 * @returns {MotionPathInfo}
 */
export function getKnightPathInfo(from, to, fen) {
  const res = Motion.getEmptyMovePathInfo();
  res.from = from;
  res.to = to;
  res.piece = getPieceAt(...from, fen);
  res.placeable = !isSameColorPiece(res.piece, getPieceAt(...to, fen));
  return res;
}

/**
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {FenPiecePosition} fen
 * @returns {MotionPathInfo}
 */
export function getKingPathInfo(from, to, fen) {
  const res = Motion.getEmptyMovePathInfo();
  res.from = from;
  res.to = to;
  res.piece = getPieceAt(...from, fen);
  // pmlog("in getKingPathInfo", `"${getPieceAt(...to, fen)}"`);
  res.placeable = !isSameColorPiece(res.piece, getPieceAt(...to, fen));
  return res;
}

/**
 * @param {MotionType} motion_type
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {MotionArray} motion
 * @param {FenPiecePosition} fen
 * @returns {MotionPathInfo}
 */
export function getPathInfoByMotionType(motion_type, from, to, motion, fen) {
  switch (motion_type) {
    case "diagonal": {
      return getPathInfoByMotion(from, to, motion, fen);
    }
    case "straight":
      return getPathInfoByMotion(from, to, motion, fen);
    case "knight":
      return getKnightPathInfo(from, to, fen);
  }
}

/**
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {MotionArray} motion
 * @param {FenPiecePosition} fen
 * @returns {MotionPathInfo}
 */
export function getPathInfoByMotion(from, to, motion, fen) {
  const from_piece = getPieceAt(...from, fen);
  /**
   * @type {MotionPathInfo}
   */
  const res = Motion.getEmptyMovePathInfo();
  res.from = from;
  res.to = to;
  res.motion = motion;
  res.piece = from_piece;
  // pmlog(res, motion);
  if (motion[0] == 0 && motion[0] == motion[1]) return res;
  /**
   * @type {FenCharWithEmptyFen}
   */
  let piece = "";
  streamFenIndexInfoFromTo(
    from,
    to,
    motion,
    function (i, j) {
      piece = getPieceAt(i, j, fen);
      res.placeable =
        (i == to[0] && j == to[1] && !isSameColorPiece(from_piece, piece)) ||
        res.placeable;
      res.empty_space++;
      if (piece != EMPTY_FEN_CHAR) {
        putIfUndefined(res, "blocking_piece", {});
        res.blocking_piece.piece = piece;
        res.blocking_piece.index = [i, j];
        res.empty_space--;
        return "break";
      }
    },
    {
      from: false,
      to: true,
      infinite: true,
    },
  );
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
  return move.replace(HYPHEN_FEN_CHAR, EMPTY_FEN_CHAR);
}

/** parsing the fen string
 * @param {FenString} fen
 * @returns {FenInfo}
 */
export function parse(fen) {
  const [position, color, castling, en_passant, hall_moves, full_moves] =
    fen.split(" ");
  return {
    position,
    // @ts-ignore
    color,
    castling: parseCastlingStr(castling),
    en_passant: parseEnPasent(en_passant),
    hall_moves: parseInt(hall_moves),
    full_moves: parseInt(full_moves),
  };
}

/**
 * @param {FenCastlingInfo} info
 */
export function stringifyCastlingStr(info) {
  return `${info.b.k ? "k" : ""}${info.b.q ? "q" : ""}${info.w.k ? "K" : ""}${info.w.q ? "Q" : ""}`;
}

/**
 * @param {ChessMove} info
 */
export function stringifyEnPassent(info) {
  return info == EMPTY_FEN_CHAR ? HYPHEN_FEN_CHAR : info;
}

/** stringify the fen info
 * @param {FenInfo} info
 * @returns {FenString}
 */
export function stringify(info) {
  return [
    info.position,
    info.color,
    stringifyCastlingStr(info.castling),
    stringifyEnPassent(info.en_passant),
    info.hall_moves,
    info.full_moves,
  ].join(" ");
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
    //@ts-ignore
    piece: fen.charAt(index),
    index: index,
    space: { before: 0, after: 0 },
  };
}

/**
 * @typedef {{row:number,col:number}} StreamTransitionObject
 */

/**provied a stream of continous piece info with index
 * @template T
 * @param {FenPiecePosition} position
 * @param {function(number,number,FenCharWithEmptyFen):T} callback
 * @returns {Array<T>}
 */
export function streamFenIndexInfo(position, callback) {
  const res = [];
  for (let i = 0, prog = 0; i < 8; i++) {
    for (let j = 0, empty_cell = 0; j < 8; j++) {
      if (empty_cell == 0) {
        const c = parseInt(position.charAt(prog));
        if (Number.isInteger(c)) {
          empty_cell = c;
          res.push(callback(j, i, EMPTY_FEN_CHAR));
          empty_cell--;
        } else {
          //@ts-ignore
          res.push(callback(j, i, position.charAt(prog)));
        }
        prog++;
      } else {
        res.push(callback(j, i, EMPTY_FEN_CHAR));
        empty_cell--;
      }
    }
    prog++;
  }
  return res;
}

/**
 * @template T
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {MotionArray} motion
 * @param {function(number,number):T|"break"} callback
 * @param {{from:boolean,to:boolean,infinite:boolean}} include
 * @returns {Array<T>}
 */
export function streamFenIndexInfoFromTo(
  from,
  to,
  motion,
  callback,
  include = { from: false, to: true, infinite: false },
) {
  const [a, b] = motion;
  const res = [];

  for (
    let i = from[0] + (include.from ? 0 : a),
      j = from[1] + (include.from ? 0 : b),
      last = false,
      result;
    !isOutOfBound(i, j);
    i += a, j += b
  ) {
    last = i == to[0] && j == to[1];
    if (last && !include.to && !include.infinite) break;
    result = callback(i, j);
    if (result == "break") break;
    res.push(result);
    if (last && !include.infinite) break;
  }
  return res;
}

/** NOTE not checking for index OutOfBound
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenPiecePosition} fen
 * @returns {FenCharWithEmptyFen}
 */
export function getPieceAt(x, y, fen) {
  return getFenIndexInfo(x, y, fen).piece;
}

/** put a piece at x,y and return a new FenPiecePosition
 * @param {FenCharWithEmptyFen} piece
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenPiecePosition} position
 * @returns {FenPiecePosition}
 */
export function putPieceAt(piece, x, y, position) {
  const info = getFenIndexInfo(x, y, position);
  if (piece == EMPTY_FEN_CHAR) return position;
  return splice(
    position,
    info.index,
    1,
    `${info.space.before == 0 ? "" : info.space.before}${piece}${info.space.after == 0 ? "" : info.space.after}`,
  );
}

/** remove piece from x,y and return new fen string
 * @param {number} x - col index
 * @param {number} y - row index
 * @param {FenPiecePosition} fen
 * @returns {{piece:FenCharWithEmptyFen,position:FenPiecePosition}}
 */
export function pickPieceAt(x, y, fen) {
  const info = getFenIndexInfo(x, y, fen);
  if (info.piece == EMPTY_FEN_CHAR)
    return { position: fen, piece: EMPTY_FEN_CHAR };
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
  return { position: splice(fen, start, to, `${space}`), piece: info.piece };
}

/** return true if played moved is valid
 * @param {BoardCellIndex} from - current cell name
 * @param {BoardCellIndex} to - destination cell name
 * @param {FenInfo} info - fen info
 * @returns {MotionPathInfo|undefined}
 */
export function getMoveInfo(from, to, info) {
  const piece = getPieceAt(...from, info.position);
  return piece == EMPTY_FEN_CHAR
    ? undefined
    : Motion[piece] == undefined
      ? undefined
      : Motion[piece](from, to, info);
}

/**
 * @param {BoardCellIndex} to - destination cell name
 * @param {BoardCellIndex} from - current cell name
 * @param {FenPiecePosition} position - current chess fen
 * @returns {FenPiecePosition}
 */
export function pickAndPutPieceAt(from, to, position) {
  const pick_info = pickPieceAt(...from, position);
  //@ts-ignore
  return putPieceAt(pick_info.piece, ...to, pick_info.position);
}

/**
 * @param {BoardCellIndex} to - destination cell name
 * @param {BoardCellIndex} from - current cell name
 * @param {BoardInfo} fen - current chess fen
 * @returns {{board_info:BoardInfo,transition_info:TransitionInfo|undefined}}
 */
export function transition(from, to, fen) {
  const info = parse(fen.fen);
  const move_info = getMoveInfo(from, to, info);
  const new_info = {
    position: "",
    en_passant: EMPTY_FEN_CHAR,
    castling: info.castling,
    color: toggleColor(info.color),
    hall_moves: info.hall_moves + toggleColor(info.color) == "b" ? 1 : 0,
    full_moves: info.full_moves + toggleColor(info.color) == "w" ? 1 : 0,
  };
  const res = {
    transition_info: {
      capture: {
        en_passant: info.en_passant == "",
        piece: move_info.piece == "p" ? "P" : "p",
      },
      check: false,
      checkmate: false,
      fen: "",
      castling: undefined,
    },
    board_info: {
      kings: { ...fen.kings },
    },
  };
  const props = {
    from,
    to,
    move_info,
    fen_info: info,
    new_fen_info: new_info,
    //@ts-ignore
    transition_info: res.transition_info,
    king_info: res.board_info.kings,
  };
  for (const c in Handler.PLAYED_MOTION_PATH_INFO) {
    if (move_info.cases[c] == undefined) continue;

    props.info = move_info.cases[c];
    //@ts-ignore
    if (Handler.PLAYED_MOTION_PATH_INFO[c](props) == "failed") {
      return {
        board_info: fen,
        transition_info: undefined,
      };
    }
  }
  // pmlog(new_info);
  res.board_info.fen = stringify(new_info);
  // @ts-ignore
  return res;
}

/** index of pawn at oponent's last rank
 * color="w" means white pawn on black's last rank
 * @param {ChessColor} color
 * @param {FenPiecePosition} position
 * @returns {void|BoardCellIndex}
 */
export function getPromotionFor(color, position) {
  for (let i = 0; i < 8; i++) {
    const p = getPieceAt(i, color == "w" ? 0 : 7, position);
    if (p == "P" && color == "w") return [i, 0];
    if (p == "p" && color == "b") return [i, 7];
  }
}

/** return a printable fen string for console
 * @param {FenPiecePosition} position
 * @returns {string}
 */
export function print(position) {
  let res = "";
  streamFenIndexInfo(position, (i, j, piece) => {
    res = res.concat(
      i == 0 ? j + " |" : "",
      piece == EMPTY_FEN_CHAR ? " " : piece,
      " ",
      i == 7 ? "\n" : "",
    );
  });
  res += "   ";
  for (let i = 0; i < 8; i++) {
    res = res.concat("‾‾", i == 7 ? "\n" : "");
  }
  res += "   ";
  for (let i = 0; i < 8; i++) {
    res = res.concat(i.toString(), " ", i == 7 ? "\n" : "");
  }
  return res;
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
