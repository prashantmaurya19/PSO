export const log = console.log;

/**
 * @returns {string}
 */
export function getTrace() {
  var err = new Error();
  return err.stack;
}

/**
 * @param {object} data
 */
export function pmlog(data, ...args) {
  // i know name is rediculas
  log(`0: pmlog => `, data);
  args.forEach((v, i) => {
    log(`${i + 1}: pmlog => `, v);
  });
  return data;
}

/**
 * @template T
 * @param {T} t - value to debug
 * @returns {T}
 */
export function debug(t) {
  log(`%c${t}`, "color:red;");
  return t;
}
