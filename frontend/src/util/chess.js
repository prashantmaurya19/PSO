import { FontAwesomeChessPieceProvider } from "../impl/chess_piece_providers";

/** get a piece element from PieceProvide according
 * to the FEN character
 * @param {string} c - character in FEN string
 * @param {FontAwesomeChessPieceProvider} provider
 * @param {import("./jjsx").JSXElement} svgArgs
 * @param {import("./jjsx").JSXElement} pathArgs
 * @returns {import("react").JSX.Element}
 */
export function getFENCharToChessPieceELement(c, provider, svgArgs, pathArgs) {
  c = c.toLowerCase();
  if (c == "r") return provider.getRook(0, svgArgs, pathArgs);
  else if (c == "n") return provider.getKnight(0, svgArgs, pathArgs);
  else if (c == "b") return provider.getBishop(0, svgArgs, pathArgs);
  else if (c == "q") return provider.getQueen(0, svgArgs, pathArgs);
  else if (c == "k") return provider.getKing(0, svgArgs, pathArgs);
  else if (c == "p") return provider.getPawn(0, svgArgs, pathArgs);
  throw TypeError(`'${c}' is a invalid FEN char`);
}
