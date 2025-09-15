/**
 * all time and duration related types and function present
 * here
 */

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
 */

/**
 * @typedef {Record<MiliSecond,DurationTransformationRule>} DurationTransformationRuleList
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
 * @returns {string}
 */
export function formatMiliSeconds(ms) {
  return `${ms2min(ms)}:${String((ms % 60000) / 1000).padStart(2, "0")}`;
}
