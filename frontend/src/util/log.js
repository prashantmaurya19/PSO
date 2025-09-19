export const log = console.log;
const option = {
  logging: true,
};

/** pass true for turn on logging
 * and false for off
 * @param {boolean} log
 */
export function setLogging(log) {
  option.logging = log;
}

/**
 * @returns {string}
 */
export function getTrace() {
  var err = new Error();
  return err.stack;
}

/**
 * @returns {function(...object):void}
 */
export function logCheckPoint() {
  let count = 0;
  return (...a) => {
    log(`${count}: checkpoint`, ...a);
    count++;
  };
}

/**
 * @param {object} data
 * @param {...object} args
 */
export function pmlog(data, ...args) {
  // i know name is rediculas
  log(`0: pmlog => `, data);
  args.forEach((v, i) => {
    log(`${i + 1}: pmlog => `, v);
  });
  log(`------>debug end<------------`);
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
