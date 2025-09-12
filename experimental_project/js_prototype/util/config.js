import { FontAwesomeChessPieceProvider } from "../impl/chess_piece_providers";

export class StorageManager {
  /**
   * @param {object} state - an object with key value pair
   * @param {boolean} [strict=false] - throw exception if overiding the key or key is not present while get
   */
  constructor(state, strict = false) {
    this.state = state == undefined ? {} : state;
    this.strict = strict;
  }
  /** set data and throw exception on overiding value if [strict=true]
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    if (this.strict && this.state[key] != undefined)
      throw ReferenceError(`${key} is already present`);
    this.state[key] = value;
  }
  /** retrive data and throw exception on invalid key if [strict=true]
   * @param {string} key
   */
  get(key) {
    if (this.strict && this.state[key] == undefined)
      throw ReferenceError(`${key} is not present`);
    return this.state[key];
  }
}

/**
 * @typedef Configuration
 * @property {object} provider
 * @property {object} provider.ref
 * @property {function(string):object} provider.ref.get
 * @property {object} provider.chess_piece
 * @property {FontAwesomeChessPieceProvider} provider.chess_piece.font_awesome
 * @property {object} collector
 * @property {object} collector.refs
 * @property {function(string):object} collector.get
 * @property {function(string,object):void} collector.set
 */

const collector = new (function () {
  this.refs = {};
  /** get ref by key
   * @function
   * @param {string} key
   * @return {object}
   */
  this.get = function (key) {
    return this.refs[key];
  };

  /**  set ref by key
   * @function
   * @param {string} key
   * @param {object} refs
   */
  this.set = function (key, refs) {
    this.refs[key] = refs;
  };
})();

const provider = {
  chess_piece: {
    font_awesome: new FontAwesomeChessPieceProvider(),
  },
  ref: new (function () {
    this.get = collector.get.bind(collector);
  })(),
};

/**
 * @type {Configuration}
 */
const M = {
  provider,
  collector,
};

export default M;
