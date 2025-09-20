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
 * @property {string} label
 */

/**
 * @type {Array<DurationCache>}
 */
export const TIME_DURATION_CATAGORIES = [
  {
    label: "1 Min",
    type: "bullet",
    time: min2ms(1),
    rules: [],
  },
  {
    label: "2 Min",
    type: "bullet",
    time: min2ms(2),
    rules: [],
  },
  {
    label: "2Min+1",
    type: "bullet",
    time: min2ms(2),
    rules: [
      {
        move: 1,
        threshold: 1000,
        time: 1000,
      },
    ],
  },
  {
    label: "3 Min",
    time: min2ms(3),
    type: "rapid",
    rules: [],
  },
  {
    label: "5 Min",
    time: min2ms(5),
    type: "rapid",
    rules: [],
  },
  {
    label: "10 Min",
    time: min2ms(10),
    type: "rapid",
    rules: [],
  },
];

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
