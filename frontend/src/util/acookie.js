import { splice } from "./astring";
import { pmlog } from "./log";

// if (document == undefined) {
//   pmlog("i that u")
//   var document = { cookie: "" };
// }

export const d = document;

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

    return this.getInfo(name)?.value;
  }

  /**
   * @param {string} name
   * @param {string} value
   */
  static setCookie(name, value) {
    document.cookie = name + "=" + value + "; Path=/;";
  }

  /**
   * @param {string} name
   * @param {string} value
   */
  static updateCookie(name, value) {
    const info = this.getInfo(name);
    if (info == undefined) return;
    document.cookie = splice(document.cookie, info.start, info.length, value);
  }

  /**
   * @param {string} name
   */
  static deleteCookie(name) {
    const info = this.getInfo(name);
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  /**
   * @typedef {{start:number,end:number,length:number,value:string,match:string}} CookieInfo
   * @param {string} name
   * @returns {CookieInfo}
   */
  static getInfo(name) {
    /** @type {CookieInfo} */
    let res = { start: -1, end: -1, value: "", length: 0, match: "" };
    let dc = document.cookie;
    const regex = new RegExp(`(${name})\\s*=\\s*([^;]+)\\s*[;]{0,1}`, "gi");
    const result = regex.exec(dc);
    if (result == undefined) return;

    res.start = result.index + name.length + 1;
    res.end = dc.length - result.index + name.length;
    res.value = decodeURI(dc.substring(res.start, res.end));
    if (res.value.charAt(res.value.length - 1) == ";") {
      res.end--;
      res.value = splice(res.value, res.value.length - 1, 1, "");
    }
    res.length = res.value.length;
    res.match = result[0];
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
  return hasCookie(name)
    ? updateCookie(name, value)
    : ACookie.setCookie(name, value);
}

/**
 * @param {CookieNames} name
 */
export function getCookie(name) {
  return pmlog(ACookie.getCookie(name), document.cookie, "getCookie");
}

/** return true if cookie exits otherwise false
 * @param {CookieNames} name
 * @returns {boolean}
 */
export function hasCookie(name) {
  return ACookie.hasCookie(name);
}

/** return true if cookie exits otherwise false
 * @param {CookieNames} name
 * @param {string} value
 */
export function updateCookie(name, value) {
  return ACookie.updateCookie(name, value);
}

/**
 * @param {CookieNames} name
 */
export function deleteCookie(name) {
  return ACookie.deleteCookie(name);
}
