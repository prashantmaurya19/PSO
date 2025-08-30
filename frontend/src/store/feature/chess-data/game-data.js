/**
 * @typedef {"b"|"w"} PlayerSide
 */
export class ChessData {
  /**
   * @param {import("../app-data/app-data").AppData} d
   */
  constructor(d) {
    /**
     * @type {import("../app-data/app-data").AppData}
     */
    this.data = d;
    this.game_data = null;
  }

  /**
   * @param {PlayerSide} side
   */
  newGame(side) {
    this.game_data = {
      time: this.data.duration,
      side,
    };
  }

  /** return clock string
   * @returns {string}
   */
  getClockStr() {
    return "";
  }

  /**
   * @param {number} t
   */
  decrementClock(t) {
    this.game_data.time -= t;
  }

  /**
   * @param {number} t
   */
  incrementClock(t) {
    this.game_data.time += t;
  }
}
