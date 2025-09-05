/**
 * @typedef {string} ChessMove
 */

/** return string of chess notation of cell
 * eg 5,3 => e3 ...etc
 * @param {number} x - col number
 * @param {number} y - row number
 * @returns {string}
 */
export function index2Move(x, y) {
  return `${String.fromCharCode(97 + x)}${y}`;
}

/** return a tuple(array of 2 element x,y) where x is col and y is row number
 * @param {ChessMove} m
 * @returns {Array<Number>}
 */
export function fromMove2Index(m) {
  return [m.charCodeAt(0) - 97, parseInt(m.charAt(1))];
}
