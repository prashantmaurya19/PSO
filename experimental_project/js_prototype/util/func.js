/**
 * @param {Function|null} func
 * @param {...any} args
 * @return {object|void}
 */
export function callIfNotNull(func, ...args) {
  if (func == null) return;
  return func(...args);
}
