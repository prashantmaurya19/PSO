import { indexOfNthOccurrence, splice } from "./util/astring.js";
import {
  printFen,
  printFenBoard,
  getPieceAt,
  transition,
  getFenIndexInfo,
  pickPieceAt,
  verifyPieceMoved,
  putPieceAt,
  parse,
  getPath,
  Motion,
} from "./util/chess.js";

// console.log(printFen("rnbqkbnr/pppppppp/8/8/3P4/4PN2/PPP2PPP/RNBQKB1R"));
const log = console.log;
let pos = "rn2kbnr/pb4pp/1p2pp2/3p4/4PP2/3P1N2/PPP3PP/RNBQKB1R b KQkq e3 0 1";
// console.log(getPieceAt(0,0,pos))
console.log(printFen(pos));
// log(pos);
// pos = transition("h8", "h7", pos);
// log(pos);
// log(printFen(pos));
const info = parse(
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PP1/RNBQKBNR b KQkq e3 0 1",
);
log(info);
log(Motion.r([7, 7], [2, 1], info.position));
// log(getFenIndexInfo(5, 6, pos));
