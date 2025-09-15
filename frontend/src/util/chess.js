/**
 * @typedef {"k"|"q"} CastlingSide
 * @typedef {Array<MotionPathInfo>} MoveInfoList
 * @typedef {"diagonal"|"straight"|"knight"} MotionType
 * @typedef {Record<ChessColor,BoardCellIndex>} BoardKingsIndexInfo
 * @typedef {Record<ChessColor,boolean>} FenCastlingInfo
 * @typedef {Array<FenChar>} AttackingPieceList
 * @typedef {""} EmptyFen
 * @typedef {FenChar|EmptyFen} FenCharWithEmptyFen
 * @typedef {[number,number]} BoardCellIndex
 * @typedef {[number,number]} MotionIndex
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
 * @typedef {Object} AttackingPieceInfoWithMotionInfo
 * @property {FenChar} piece
 * @property {MotionPathInfo} motion_info
 */
/**
 * @template T
 * @typedef {Record<MotionType,T>} MotionMap
 */
/**
 * @typedef {Object} BoardStateInfo
 * @property {FenInfo} fen_info
 * @property {BoardKingsIndexInfo} king_info
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
 * @property {MotionIndex} [ motion ]
 * @property {Object<string,object|CastlingInfo>} cases
 * @property {BoardCellIndexInfo} [ blocking_piece ]
 * @property {object} [ debug ]
 * @property {FenCharWithEmptyFen} piece
 * @property {boolean} placeable
 * @property {number} empty_space
 */

import { clone, combine, copy, putIfUndefined } from "@pso/util/aobject.js";
import {
  indexOfNthOccurrence,
  isLowerCase,
  isUpperCase,
  splice,
} from "./astring.js";
import { log, logCheckPoint, pmlog } from "@pso/util/log.js";

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
   * @param {MotionIndex} motion
   * @returns {MotionIndex}
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
   * @returns {MotionIndex}
   */
  static getMotionFromTo(from, to) {
    return [
      MotionPath.getMotionFromToAxis(from[0], to[0]),
      MotionPath.getMotionFromToAxis(from[1], to[1]),
    ];
  }

  /** is motion is on y(row axis) axis
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isForwardPathY(motion) {
    return motion[1] > 0;
  }

  /** forward motion in x(col axis) axis
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isForwardPathX(motion) {
    return motion[0] > 0;
  }

  /** is motion is on x(col axis)
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isPathX(motion) {
    return motion[1] == 0;
  }

  /** is motion is on y(row axis)
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isPathY(motion) {
    return motion[0] == 0;
  }

  /**
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isForwordStraightPath(motion) {
    return (
      (MotionPath.isPathX(motion) || MotionPath.isPathY(motion)) &&
      (MotionPath.isForwardPathX(motion) || MotionPath.isForwardPathY(motion))
    );
  }

  /**
   * @param {MotionIndex} motion
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
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isKingPath(motion) {
    return motion.reduce((p, c) => {
      return MotionPath.isKnightPathAxis(c) && p;
    }, true);
  }

  /**
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isCastling(motion) {
    return motion[1] == 0 && Math.abs(motion[0]) == 2;
  }

  /**
   * @param {MotionIndex} motion
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
   * @param {MotionIndex} motion
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
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isPawnMovep(from, motion) {
    return (
      this.isPathY(motion) &&
      ((from[1] == 1 && motion[1] == 2) || motion[1] == 1)
    );
  }

  /**
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isPawnCapturep(motion) {
    return (
      this.isDiagonal(motion) &&
      this.isForwardPathY(motion) &&
      Math.abs(motion[0]) == 1
    );
  }

  /**
   * @param {MotionIndex} motion
   * @returns {boolean}
   */
  static isPawnCaptureP(motion) {
    return (
      this.isDiagonal(motion) &&
      !this.isForwardPathY(motion) &&
      Math.abs(motion[0]) == 1
    );
  }

  /**
   * @param {MotionIndex} motion
   * @returns {CastlingSide}
   */
  static getCastlingSide(motion) {
    return motion[0] > 0 ? "k" : "q";
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
   * @param {MotionIndex} motion
   * @param {boolean} not_verify
   * @returns {MotionPathInfo}
   */
  static #getPathHelper(from, to, info, motion, not_verify) {
    if (not_verify) return this.getEmptyMovePathInfo();
    const res = getPathInfoByMotion(
      from,
      to,
      MotionPath.absoluteMotion2UnitMotion(motion),
      info.position,
      { from: false, to: true, infinite: false },
    );
    putIfUndefined(res.cases, "not_king_move", {});
    return res;
  }

  /**
   * @param {BoardCellIndex} index
   * @param {MotionIndex} motion
   * @returns {BoardCellIndex}
   */
  static applyMotion(index, motion) {
    //@ts-ignore
    return index.map((v, i) => v + motion[i]);
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
    const res = getPathInfoByMotion(from, to, motion, info.position, {
      from: false,
      to: true,
      infinite: false,
    });
    putIfUndefined(res.cases, "not_king_move", {});
    return res;
  }

  /**
   * @param {BoardCellIndex} from
   * @param {BoardCellIndex} to
   * @param {FenInfo} info
   * @returns {MotionPathInfo}
   */
  static k(from, to, info) {
    const motion = MotionPath.getMotionFromTo(from, to);
    if (!(MotionPath.isCastling(motion) || MotionPath.isKingPath(motion))) {
      return this.getEmptyMovePathInfo();
    }
    const res = getKingPathInfo(from, to, info.position);
    putIfUndefined(res.cases, "king_move", { to });
    putIfUndefined(res.cases, "king_check", { from, to });
    if (MotionPath.isCastling(motion)) {
      const castling_side = MotionPath.getCastlingSide(motion);
      pmlog(motion, castling_side, info);
      if (info.castling[info.color]) {
        putIfUndefined(res.cases, "castling", {
          rook: Handler.CASTLING_ROOK_INDEX[res.piece]()[castling_side],
        });
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
   * @type {Record<"k"|"K",function():Record<CastlingSide,{ to: [number, number], from: [number, number] }>>}
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
   * @type {Object<string,function({from:BoardCellIndex,to:BoardCellIndex,move_info:MotionPathInfo,next:BoardStateInfo,prev:BoardStateInfo,transition_info:TransitionInfo,info:object|CastlingInfo}):void|"failed">}
   */
  static PLAYED_MOTION_PATH_INFO = {
    king_check: function ({ next, move_info }) {
      if (
        !isSafeForPiece(move_info.piece, move_info.to, next.fen_info.position)
      ) {
        return "failed";
      }
    },
    not_king_move: function ({ prev, next }) {
      if (
        !InspectPiece.isSafeAt(
          prev.king_info[prev.fen_info.color],
          combine(prev.fen_info, { position: next.fen_info.position }),
        )
      ) {
        return "failed";
      }
    },
    place: function ({ prev, next, from, to }) {},
    king_move: function ({ prev, next, info }) {
      next.fen_info.castling[prev.fen_info.color] = false;
      next.king_info[prev.fen_info.color] = info.to;
    },
    castling: function ({ next, move_info, prev, info }) {
      if (
        !isSafePathForPiece(
          move_info.piece,
          move_info.from,
          move_info.to,
          prev.fen_info.position,
          {
            from: false,
            to: false,
          },
        )
      ) {
        return "failed";
      }
      next.fen_info.position = pickAndPutPieceAt(
        info.rook.from,
        info.rook.to,
        next.fen_info.position,
      );
    },
  };

  /**
   * @type {MotionMap<function({motion_type:MotionType,color:ChessColor,info:MotionPathInfo}):undefined|FenChar>}
   */
  static IS_PIECE_ATTACKING = {
    knight: function ({ info }) {
      const piece = info.blocking_piece?.piece.toLowerCase();
      if (piece == "n") {
        return info.blocking_piece?.piece;
      }
    },
    diagonal: function ({ info }) {
      const piece = info.blocking_piece?.piece.toLowerCase();
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
    straight: function ({ info }) {
      const piece = info.blocking_piece?.piece.toLowerCase();
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

/** return object of attack and defend piece list
 * @param {FenInfo} fen_info
 * @param {IndexInfo} index_info
 * @returns {{attack:MoveInfoList,defend:MoveInfoList}}
 */
export function getLegalMoveInfo(fen_info, index_info) {
  /** @type {{attack:MoveInfoList,defend:MoveInfoList}} */
  const res = { attack: [], defend: [] };
  /** @type {MotionPathInfo} */
  let info = null;
  /** @type {MotionPathInfo} */
  let move_info = null;

  for (const motion_type in Handler.IS_PIECE_ATTACKING) {
    for (const i in index_info[motion_type]) {
      info = index_info[motion_type][i];
      // if (motion_type == "knight") pmlog(motion_type, i, info, fen_info.color);

      const piece = info.blocking_piece?.piece.toLowerCase();
      if (piece == undefined || piece == EMPTY_FEN_CHAR) continue;
      if (info.blocking_piece == undefined || info.from == undefined) continue;

      move_info = getMoveInfo(info.blocking_piece.index, info.from, fen_info);

      if (!move_info.placeable) continue;
      res[
        getColor(info.blocking_piece.piece) == fen_info.color
          ? "defend"
          : "attack"
      ].push(move_info);
    }
  }
  return res;
}

/** return array of piecies that can attack or reach
 * @param {ChessColor|EmptyFen} player_color
 * @param {IndexInfo} index_info
 * @returns {Array<AttackingPieceInfoWithMotionInfo>}
 */
export function getAttackPiece(player_color, index_info) {
  /**
   * @type {Array<AttackingPieceInfoWithMotionInfo>}
   */
  const res = [];
  let info = null;
  for (const motion_type in Handler.IS_PIECE_ATTACKING) {
    for (const i in index_info[motion_type]) {
      info = index_info[motion_type][i];
      const piece = info.blocking_piece?.piece.toLowerCase();
      if (piece == undefined || piece == EMPTY_FEN_CHAR) continue;
      //@ts-ignore
      if (getColor(info.blocking_piece?.piece) == player_color) continue;
      const attack_piece = Handler.IS_PIECE_ATTACKING[motion_type]({
        motion_type,
        color: player_color,
        info,
      });
      if (attack_piece) res.push({ piece: attack_piece, motion_info: info });
    }
  }
  return res;
}

/** return array of piecies that can attack or reach
 * @param {ChessColor|EmptyFen} player_color
 * @param {IndexInfo} index_info
 * @returns {AttackingPieceInfo}
 */
export function getAllAttackPiece(player_color, index_info) {
  return {
    list: getAttackPiece(player_color, index_info).map((v) => v.piece),
    piece: index_info.piece,
  };
}

/** piece must present on given index
 * @param {BoardCellIndex} index
 * @param {FenPiecePosition} position
 * @returns {boolean}
 */
export function isSafeAtIndex(index, position) {
  return isSafeForPiece(getPieceAt(...index, position), index, position);
}

/** king must present on given index
 * @param {BoardCellIndex} index
 * @param {FenInfo} info
 * @returns {boolean}
 */
export function isCheckMate(index, info) {
  const king = getPieceAt(...index, info.position);
  const all_motion_index_info = getIndexInfoInAllMotion(index, info.position);
  const attack_piece = getLegalMoveInfo(info, all_motion_index_info);
  if (attack_piece.attack.length == 0) {
    // pmlog(attack_piece.attack.length,king, index, info.position);
    return false;
  }
  if (
    attack_piece.attack.length == 1 &&
    !isSafeAtIndex(attack_piece.attack[0].blocking_piece.index, info.position)
  ) {
    // pmlog(king, index, info.position);
    return false;
  }

  // pmlog(
  //   king,
  //   color,
  //   attack_piece[0].motion_info.blocking_piece,
  //   isSafeAtIndex(attack_piece[0].motion_info.blocking_piece.index, position),
  // );

  for (const motion of MotionPath.PATHS.diagonal) {
    // @ts-ignore
    if (isOutOfBound(...Motion.applyMotion(index, motion))) {
      continue;
    }
    if (
      //@ts-ignore
      isSafeForPiece(king, Motion.applyMotion(index, motion), info.position) &&
      //@ts-ignore
      getKingPathInfo(index, Motion.applyMotion(index, motion), info.position)
        .placeable
    ) {
      ////@ts-ignore
      //pmlog(
      //  "diagonal",
      //  //@ts-ignore
      //  isSafeForPiece(king, Motion.applyMotion(index, motion), info.position),
      //  //@ts-ignore
      //  Motion.applyMotion(index, motion),
      //  index,
      //  motion,

      //  //@ts-ignore
      //  getPieceAt(...Motion.applyMotion(index, motion), info.position),
      //  //@ts-ignore
      //  getKingPathInfo(index, Motion.applyMotion(index, motion), info.position)
      //    .placeable,
      //);
      return false;
    }
  }
  for (const motion of MotionPath.PATHS.straight) {
    // @ts-ignore
    if (isOutOfBound(...Motion.applyMotion(index, motion))) {
      continue;
    }
    if (
      //@ts-ignore
      isSafeForPiece(king, Motion.applyMotion(index, motion), info.position) &&
      //@ts-ignore
      getKingPathInfo(index, Motion.applyMotion(index, motion), info.position)
        .placeable
    ) {
      //pmlog(
      //  "straight",
      //  //@ts-ignore
      //  isSafeForPiece(king, Motion.applyMotion(index, motion), info.position),
      //  //@ts-ignore
      //  Motion.applyMotion(index, motion),
      //  index,
      //  motion,
      //  //@ts-ignore
      //  getPieceAt(...Motion.applyMotion(index, motion), info.position),

      //  //@ts-ignore
      //  getKingPathInfo(index, Motion.applyMotion(index, motion), info.position)
      //    .placeable,
      //);
      return false;
    }
  }

  for (const att_piece of attack_piece.attack) {
    if (
      att_piece.blocking_piece.piece.toLowerCase() == "n" ||
      att_piece.empty_space == 0
    ) {
      return true;
    }
  }

  // means there is only one attacking piece left to checkmate

  if (attack_piece.attack.length > 1)
    console.warn("here is isCheckMate having a problem");

  // here need to check for block check
  // pmlog(attack_piece.attack.length);

  let safe = true;
  streamFenIndexInfoFromTo(
    index,
    attack_piece.attack[0].blocking_piece.index,
    attack_piece.attack[0].motion,
    (i, j) => {
      const all_motion_index_info = getIndexInfoInAllMotion(
        [i, j],
        info.position,
      );
      const legal_moves = getLegalMoveInfo(info, all_motion_index_info);
      for (const m of legal_moves.defend) {
        if (m.blocking_piece.piece == king) continue;
        const new_position = pickAndPutPieceAt(
          m.blocking_piece.index,
          [i, j],
          info.position,
        );
        if (isSafeAtIndex(index, new_position)) {
          // pmlog(info.position, new_position);
          safe = false;
          return "break";
        }
      }
    },
    {
      from: false,
      to: false,
      infinite: false,
    },
  );
  return safe;
}

class InspectPiece {
  /**
   * @param {BoardCellIndex} index
   * @param {FenInfo} fen_info
   */
  static isSafeAt(index, fen_info) {
    return (
      pmlog(
        getLegalMoveInfo(
          fen_info,
          getIndexInfoInAllMotion(index, fen_info.position),
        ).attack,
      ).length == 0
    );
  }
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
  /** @type {IndexInfo} */
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
 * @param {MotionIndex} motion
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
    case "knight": {
      return getPathInfoByMotion(
        from,
        Motion.applyMotion(from, motion),
        motion,
        fen,
        { from: false, to: true, infinite: false },
      );
    }
  }
}

/**
 * @param {BoardCellIndex} from
 * @param {BoardCellIndex} to
 * @param {MotionIndex} motion
 * @param {FenPiecePosition} fen
 * @param {Partial<{from:boolean,to:boolean,infinite:boolean}>} [include_from_to]
 * @returns {MotionPathInfo}
 */
export function getPathInfoByMotion(
  from,
  to,
  motion,
  fen,
  include_from_to = {
    from: false,
    to: true,
    infinite: true,
  },
) {
  const from_piece = getPieceAt(...from, fen);
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
        (IndexCoordinator.isSameBoardCellIndex([i, j], to) &&
          !isSameColorPiece(from_piece, piece)) ||
        res.placeable;
      res.empty_space++;
      if (
        piece != EMPTY_FEN_CHAR &&
        !IndexCoordinator.isSameBoardCellIndex(from, [i, j])
      ) {
        putIfUndefined(res, "blocking_piece", {});
        res.blocking_piece.piece = piece;
        res.blocking_piece.index = [i, j];
        res.empty_space--;
        return "break";
      }
    },
    include_from_to,
  );
  return res;
}

/** return true if invalid index given otherwise false
 * @param {number} x
 * @param {number} y
 */
export function isOutOfBound(x, y) {
  return isAxisOutOfBound(y) || isAxisOutOfBound(x);
}

/**
 * @param {number} x
 * @returns {boolean}
 */
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
      b: false,
      w: false,
    };
  }
  return {
    b: fen.indexOf("k") != -1 || fen.indexOf("q") != -1,
    w: fen.indexOf("K") != -1 || fen.indexOf("Q") != -1,
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
  return `${info.b ? "kq" : ""}${info.w ? "KQ" : ""}`;
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
 * @param {MotionIndex} motion
 * @param {function(number,number):T|"break"} callback
 * @param {Partial<{from:boolean,to:boolean,infinite:boolean}>} include
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
  const prev = {
    fen_info: info,
    king_info: fen.kings,
  };
  const next = {
    fen_info: {
      position: "",
      en_passant: EMPTY_FEN_CHAR,
      castling: info.castling,
      color: toggleColor(info.color),
      hall_moves: info.hall_moves + (toggleColor(info.color) == "b" ? 1 : 0),
      full_moves: info.full_moves + (toggleColor(info.color) == "w" ? 1 : 0),
    },
    king_info: clone(fen.kings),
  };
  const res = {
    transition_info: {
      capture: {
        en_passant: false,
        piece: "",
      },
      check: false,
      checkmate: false,
      fen: "",
      castling: undefined,
    },
    board_info: {
      kings: null,
    },
  };
  const props = {
    from,
    to,
    move_info,
    prev,
    next,
    transition_info: res.transition_info,
  };
  if (
    move_info == undefined ||
    !move_info.placeable ||
    prev.fen_info.color != getColor(move_info.piece)
  ) {
    return {
      board_info: fen,
      transition_info: undefined,
    };
  }

  next.fen_info.position = pickAndPutPieceAt(from, to, prev.fen_info.position);
  for (const c in Handler.PLAYED_MOTION_PATH_INFO) {
    if (move_info.cases[c] == undefined) continue;

    props.info = move_info.cases[c];
    //@ts-ignore
    if (Handler.PLAYED_MOTION_PATH_INFO[c](props) == "failed") {
      pmlog("failed", props);
      return {
        board_info: fen,
        transition_info: undefined,
      };
    }
  }
  res.board_info.fen = stringify(next.fen_info);
  res.board_info.kings = next.king_info;
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

/**
 * @param {Partial<FenInfo>} [opt={}]
 * @returns {FenInfo}
 */
export function getEmptyFenInfo(opt = {}) {
  return {
    castling: undefined,
    full_moves: 0,
    hall_moves: 0,
    en_passant: "",
    color: "b",
    position: "",
    ...opt,
  };
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

export class IndexCoordinator {
  /** return true if a and b index  is same
   * @param {BoardCellIndex} a
   * @param {BoardCellIndex} b
   * @returns {boolean}
   */
  static isSameBoardCellIndex(a, b) {
    return a.reduce((p, c, i) => p && c == b[i], true);
  }

  /**
   * @param {number} i - col number
   * @param {number} j - row number
   */
  static flatTwoDimensionalIndex(i, j) {
    return j * 8 + i;
  }

  /**
   * @param {BoardCellIndex} index
   * @returns {number}
   */
  static flatBoardCellIndex(index) {
    return this.flatTwoDimensionalIndex(...index);
  }
}
