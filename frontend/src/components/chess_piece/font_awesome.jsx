import c from "@pso/util/config";
const provider = c.provider.chess_piece.font_awesome;

/**
 * @param {...object} opt
 */
export function RandomChessPiece(...opt) {
  return provider.getRandomePiece(...opt);
}

export default { RandomChessPiece };
