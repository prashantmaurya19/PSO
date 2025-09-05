import { indexOfNthOccurrence, splice } from "./util/astring.js";
import {
  parseFen,
  printFen,
  ChessPieceMotion,
  printFenBoard,
  getPieceAt,
  transition,
  getFenIndexInfo,
  pickPieceAt,
  verifyPieceMoved,
  putPieceAt,
} from "./util/chess.js";

// console.log(printFen("rnbqkbnr/pppppppp/8/8/3P4/4PN2/PPP2PPP/RNBQKB1R"));
const log = console.log;
let pos = "rn2kbnr/pb4pp/1p2pp2/3p4/4PP2/3P1N2/PPP3PP/RNBQKB1R";
// console.log(getPieceAt(0,0,pos))
console.log(printFen(pos));
log(pos);
pos = transition("h8", "h7", pos);
log(pos);
log(printFen(pos));
// log(getFenIndexInfo(5, 6, pos));
