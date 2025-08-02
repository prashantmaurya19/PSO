import { FontAwesomeChessPieceProvider } from "../impl/chess_piece_providers";

/**
 * @type {{provider:{chess_piece:{font_awesome:FontAwesomeChessPieceProvider}}}}
 */
const M = {
  provider: {
    chess_piece: {
      font_awesome: new FontAwesomeChessPieceProvider(),
    },
  },
};


export default M;
