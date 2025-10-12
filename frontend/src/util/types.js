/**
 * @param {object} o
 * @returns {string}
 */
export function getTypeName(o) {
  return o.constructor.name;
}

/** check if o is any of given type return true
 * @template T
 * @param {T} o
 * @param {...Function} types - type name
 * @returns {o is T}
 */
export function isTypeOf(o, ...types) {
  for (const a of types) {
    if (getTypeName(o) === a.name) return true;
  }
  return false;
}
