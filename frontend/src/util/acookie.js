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
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }
  /**
   * @param {string} name
   * @param {string} value
   */
  static setCookie(name, value) {
    document.cookie += `${name}=${value};`;
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
