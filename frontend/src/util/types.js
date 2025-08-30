/**
 * @param {object} o
 * @returns {string}
 */
export function getTypeName(o) {
  return o.constructor.name;
}
/** check if o is any of given type return true
 * @param {object} o
 * @param {...Function} types - type name
 * @returns {boolean}
 */
export function isTypeOf(o, ...types) {
  for (const a of types) {
    if (getTypeName(o) === a.name) return true;
  }
  return false;
}
