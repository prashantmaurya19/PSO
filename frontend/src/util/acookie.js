import { splice } from "./astring";

export class ACookie {
  /** return true if cookie exits otherwise false
   * @param {string} name
   * @returns {boolean}
   */
  static hasCookie(name) {
    return this.getCookie(name) != null;
  }
  /**
   * @param {string} name
   * @returns {string}
   */
  static getCookie(name) {
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return this.getInfo(name).value;
  }

  /**
   * @param {string} name
   * @param {string} value
   */
  static setCookie(name, value) {
    document.cookie += `${name}=${value};`;
  }

  /**
   * @param {string} name
   * @param {string} value
   */
  static updateCookie(name, value) {
    const info = this.getInfo(name);
    document.cookie = splice(document.cookie, info.start, info.length, value);
  }

  /**
   * @typedef {{start:number,end:number,length:number,value:string}} CookieInfo
   * @param {string} name
   * @returns {CookieInfo}
   */
  static getInfo(name) {
    /**
     * @type {CookieInfo}
     */
    let res = { start: -1, end: -1, value: "", length: 0 };
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix),
      end;
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return res;
    } else {
      begin += 2;
      end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    res.start = begin + prefix.length;
    res.end = end;
    res.value = decodeURI(dc.substring(begin + prefix.length, end));
    res.length = res.value.length;
    return res;
  }
}

/**
 * @typedef {"token_id"} CookieNames
 */

/**
 * @param {CookieNames} name
 * @param {string} value
 */
export function setCookie(name, value) {
  return ACookie.setCookie(name, value);
}

/**
 * @param {CookieNames} name
 */
export function getCookie(name) {
  return ACookie.getCookie(name);
}

/** return true if cookie exits otherwise false
 * @param {CookieNames} name
 * @returns {boolean}
 */
export function hasCookie(name) {
  return getCookie(name) != null;
}

/** return true if cookie exits otherwise false
 * @param {CookieNames} name
 * @param {string} value
 */
export function updateCookie(name, value) {
  return ACookie.updateCookie(name, value);
}
