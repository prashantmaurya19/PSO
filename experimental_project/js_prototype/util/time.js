/** convert the ms to min
 * @param {number} ms
 */
export function ms2min(ms) {
  return Math.floor(ms / 60000);
}

/** convert minutes to miliseconds
 * @param {number} min - minutes
 */
export function min2ms(min) {
  return min * 60000;
}

/** convert miliseconds to seconds
 * @param {number} ms
 */
export function ms2sec(ms) {
  return Math.floor(ms / 1000);
}

export function formatMiliSeconds(ms) {
  return `${ms2min(ms)}:${String((ms % 60000) / 1000).padStart(2, "0")}`;
}
