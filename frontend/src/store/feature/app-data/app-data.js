
export class ChessMatch {
  static ONE_MIN = "one_min";
  static TWO_MIN = "two_min";
  static TWO_PLUS_ONE_MIN = "two_min+one";
  static THREE_MIN = "three_min";
  static FIVE_MIN = "five_min";
  static TEN_MIN = "ten_min";
}

/**
 * @typedef {"human"|"bot"} PlayerType
 */

/**
 * @typedef {Object} DurationChangeRule
 * @property {number} move - difference of current and last time applied rule move number
 * @property {number} time - time taken by player to make a move
 * @property {boolean} time_in_out - rule apply outside the time if this is false and rule apply unded the time if this is true
 *
 * @typedef {Object.<number,DurationChangeRule>} DurationChangeRuleObject
 */

/**
 * @typedef {Object} AppData
 * @property {PlayerType} player - type of player
 * @property {number} duration - duration of player's clock in ms
 * @property {DurationChangeRuleObject} increment - increment the clock
 * @property {DurationChangeRuleObject} decrement - decrement the clock
 */

export class DataGoverner {
  /**
   * @type {AppData}
   */
  #data = null;
  #chess_match_to_duration = {};

  /**
   * @param {string} key
   * @param {object} value
   */
  #handleAttributeAccess(key, value) {
    if (this.#data[key] == undefined) this.#data[key] = value;
  }

  /**
   * @param {AppData} d
   */
  constructor(d) {
    this.#data = d;
    this.#chess_match_to_duration[ChessMatch.ONE_MIN] = 60 * 1000;
    this.#chess_match_to_duration[ChessMatch.TWO_MIN] = 2 * 60 * 1000;
    this.#chess_match_to_duration[ChessMatch.TWO_PLUS_ONE_MIN] = 2 * 60 * 1000;
    this.#chess_match_to_duration[ChessMatch.THREE_MIN] = 3 * 60 * 1000;
    this.#chess_match_to_duration[ChessMatch.FIVE_MIN] = 5 * 60 * 1000;
    this.#chess_match_to_duration[ChessMatch.TEN_MIN] = 10 * 60 * 1000;
  }

  /**
   * clear the data object for fresh start
   * @returns {DataGoverner}
   */
  clear() {
    this.#data = {};
    return this;
  }

  /** set the player type
   * @param {PlayerType} pt - type of player
   * @returns {DataGoverner}
   */
  player(pt) {
    this.#data.player = pt;
    return this;
  }

  /** set duration of each player's clock
   * @param {number} t
   * @returns {DataGoverner}
   */
  duration(t) {
    this.#data.duration = t;
    return this;
  }

  /**
   * @param {number} t
   * @param {DurationChangeRule} rule
   */
  increment(t, rule) {
    this.#handleAttributeAccess("increment", {});
    this.#data.increment[t] = rule;
    return this;
  }

  /**
   * @param {number} t
   * @param {DurationChangeRule} rule
   * @returns {DataGoverner}
   */
  decrement(t, rule) {
    this.#handleAttributeAccess("decrement", {});
    this.#data.decrement[t] = rule;
    return this;
  }

  /**
   * @param {Array.<{type:"increment"|"decrement",time:number,rule:DurationChangeRule}>} a
   * @returns {DataGoverner}
   */
  rules(...a) {
    for (const r of a) {
      if (r.type == "increment") {
        this.increment(r.time, r.rule);
      } else if (r.type == "decrement") {
        this.decrement(r.time, r.rule);
      }
    }
    return this;
  }
}
