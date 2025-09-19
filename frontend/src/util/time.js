/**
 * all time and duration related types and function present
 * here
 */

import { pmlog } from "./log";

/**
 * @typedef {-1} EmptyThreshold
 * @typedef {number} Minute
 * @typedef {number} MiliSecond
 * @typedef {number} Second
 * @typedef {number} Move
 */

/**
 * @typedef {Object} DurationTransformationRule
 * @property {number} move
 * @property {MiliSecond} threshold
 * @property {MiliSecond} time
 */

/**
 * @typedef {Array<DurationTransformationRule>} DurationTransformationRuleList
 */

/**
 * @typedef {"bullet"|"rapid"} DurationType
 */

/**
 * @typedef {Object} DurationCache
 * @property {DurationType} type
 * @property {DurationTransformationRuleList} rules
 * @property {MiliSecond} time
 */

/** convert the ms to min
 * @param {Minute} ms
 */
export function ms2min(ms) {
  return Math.floor(ms / 60000);
}

/** convert minutes to miliseconds
 * @param {Minute} min - minutes
 * @returns {MiliSecond}
 */
export function min2ms(min) {
  return min * 60000;
}

/** convert miliseconds to seconds
 * @param {MiliSecond} ms
 * @returns {Second}
 */
export function ms2sec(ms) {
  return Math.floor(ms / 1000);
}

/** formate ms to display nice
 * @param {MiliSecond} ms
 * @param {MiliSecond} [threshold=10000]
 * @returns {string}
 */
export function formatMiliSeconds(ms, threshold = 10000) {
  const remin_ms = ms % 60000;
  return `${ms2min(ms)}:${String(ms2sec(remin_ms)).padStart(2, "0")}${
    ms <= threshold
      ? "." +
        String(remin_ms % 1000)
          .substring(0, 2)
          .padStart(2, "0")
      : ""
  }`;
}
