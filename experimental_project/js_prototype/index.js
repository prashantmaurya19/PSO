import { indexOfNthOccurrence, splice } from "./util/astring.js";
import {
  printFen,
  parse,
  print,
  putPieceAt,
  getIndexInfoInAllMotion,
  getAllAttackPiece,
  isSafeIndex,
  isSafePath,
  transition,
} from "./util/chess.js";
console.clear();
// console.log(printFen("rnbqkbnr/pppppppp/8/8/3P4/4PN2/PPP2PPP/RNBQKB1R"));
const log = console.log;
let pos = "rn2kbnr/pb4pp/1p2pp2/3p4/4PP2/3P1N2/PPP3PP/RNBQKB1R b KQkq e3 0 1";
pos = "rnbqkbnr/pppppppp/8/8/4P3/7p/PPPP1PP1/RNBQKBNR b KQkq e3 0 1";
pos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1";
pos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1";
pos = "r4bnr/ppR2ppp/3ppk2/2p5/8/8/PPPPPPPP/1NBQKBNR w KQkq - 0 1";
const info = parse(pos);
const index = [0, 5];
// @ts-ignore
info.position = putPieceAt("Q", ...index, info.position);
info.position = putPieceAt("Q", 5, 5, info.position);
// log(printFen(info.position));
log(print(info.position));
log(info);
// pos = transition("h8", "h7", pos);
// log(pos);
// log(printFen(pos));
// log(info);
// log(stringify(info));
// log(Motion.r([7, 7], [7, 3], info.position));
// log(getFenIndexInfo(5, 6, pos));
// @ts-ignore
// const allpath = getIndexInfoInAllMotion(index, info.position);
// for (const path_type in allpath) {
//   for (const v in allpath[path_type]) {
//     if (allpath[path_type][v].blocking_piece)
//       log(
//         v,
//         allpath[path_type][v].piece,
//         allpath[path_type][v].blocking_piece,
//         allpath[path_type][v].empty_space,
//         // allpath[path_type][v].debug.from,
//         // allpath[path_type][v].debug.path,
//       );
//   }
// }
// log(isSafePath(index, [4, 5], info.position));
const t = transition([5, 2], [6, 2], {
  fen: pos,
  kings: { w: [0, 0], b: [0, 0] },
});
log(t.board_info.fen);
log(print(t.board_info.fen));
