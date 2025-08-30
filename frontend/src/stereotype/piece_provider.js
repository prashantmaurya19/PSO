/**
 * @interface PieceProvider
 * @description interface for piece provider classes
 */
export class PieceProvider {
  /** get king icon as function component
   * @param {number|string} key
   * @returns {import("react").JSX.Element}
   */
  getKing(key) {
    throw new Error("Method 'getKing()' must be implemented.");
  }
  /** get knight icon as function component
   * @param {number|string} key
   * @returns {import("react").JSX.Element}
   */
  getKnight(key) {
    throw new Error("Method 'getKnight()' must be implemented.");
  }

  /** get queen icon as function component
   * @param {number|string} key
   * @returns {import("react").JSX.Element}
   */
  getQueen(key) {
    throw new Error("Method 'getQueen()' must be implemented.");
  }

  /** get bishop icon as function component
   * @param {number|string} key
   * @returns {import("react").JSX.Element}
   */
  getBishop(key) {
    throw new Error("Method 'getBishop()' must be implemented.");
  }

  /** get pawn icon as function component
   * @param {number|string} key
   * @returns {import("react").JSX.Element}
   */
  getPawn(key) {
    throw new Error("Method 'getPawn()' must be implemented.");
  }

  /** get rook icon as function component
   * @param {number|string} key
   * @returns {import("react").JSX.Element}
   */
  getRook(key) {
    throw new Error("Method 'getRook()' must be implemented.");
  }

  /** get a random
   * @param {number|string} key
   * @returns {import("react").JSX.Element}
   */
  getRandomePiece(){
    throw new Error("Method 'getRandomePiece()' must be implemented.");
  }
}

