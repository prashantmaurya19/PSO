import { isTypeOf } from "./types";

/**
 * @typedef {"LAST_GAME_DURATION"|"APPLICATION_USER_SETTINGS"} CacheName
 */

class StorageHandler {
  #att_name;
  #storage;
  /**
   * @param {string} name
   * @param {Storage} storage
   */
  constructor(name, storage) {
    this.#att_name = name;
    this.#storage = storage;
  }

  /**
   * @param {object} value
   */
  setItem(value) {
    this.#storage.setItem(this.#att_name, value);
  }

  set() {
    return new CacheSetHelper(this);
  }

  /** get data from localStorage
   * @returns {CacheGetHelper}
   */
  get() {
    return new CacheGetHelper(this.#storage.getItem(this.#att_name));
  }

  /** return default if cache is not exists
   * @param {object} d - default value
   */
  getOrDefault(d) {
    const res = this.get();
    if (res == null) return d;
    return res;
  }

  /**
   * @returns {boolean}
   */
  exists() {
    return this.get() != null;
  }
}

class CacheSetHelper {
  #storage;
  /**
   * @param {StorageHandler} v
   */
  constructor(v) {
    this.#storage = v;
  }

  /**
   * @param {object} value
   */
  json(value) {
    if (isTypeOf(value, Object)) {
      value = JSON.stringify(value);
    }
    this.#storage.setItem(`${value}`);
  }
}

class CacheGetHelper {
  #payload;
  constructor(v) {
    this.#payload = v;
  }
  /**
   * @returns {string}
   */
  text() {
    return this.#payload;
  }

  /**
   * @returns {object}
   */
  json() {
    return JSON.parse(this.#payload);
  }

  /**
   * @returns {number}
   */
  integer() {
    return parseInt(this.#payload);
  }

  /**
   * @returns {number}
   */
  float() {
    return parseFloat(this.#payload);
  }

  /**
   * @returns {number}
   */
  number() {
    return Number(this.#payload);
  }
}

class Cache {
  #att_name;
  #payload;
  /**
   * @type {StorageHandler}
   */
  #storage = null;
  /**
   * @param {string} name - name of cache
   */
  constructor(name) {
    this.#att_name = name;
  }

  /**
   * @returns {StorageHandler}
   */
  localstorage() {
    return new StorageHandler(this.#att_name, localStorage);
  }

  /**
   * @returns {StorageHandler}
   */
  sessionstorage() {
    return new StorageHandler(this.#att_name, sessionStorage);
  }
}

/**
 * @param {CacheName} name - name of cache
 */
export function acache(name) {
  return new Cache(name);
}
