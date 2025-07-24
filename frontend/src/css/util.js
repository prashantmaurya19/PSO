import React from "react";
import c from "./_const";
import { v1 } from "uuid";
import { getTrace } from "../util/log";

//take care more in later
/**
 * @typedef {Object.<string,React.CSSProperties>} CssPsedoProperties
 * @property {React.CSSProperties} hover
 * @property {React.CSSProperties} focus
 * @property {React.CSSProperties} active
 */

/**
 * @typedef {String} TranslatedCss
 */

/**
 * @param {string} id - uuid of element
 * @param {CssPsedoProperties} style
 */
export function css(id, style) {
  c._css.add(id, style);
}

/**
 * @param {CssPsedoProperties} props
 */
export function style(props) {
  let id = undefined;
  let t = getTrace()+JSON.stringify(props);
  if (window.style_status) {
    id = c.ids[t];
  } else {
    id = c.ids[t] ? c.ids[t] : uuid();
    c.ids[t] = id;
    css(id, props);
  }
  return {
    id: id,
  };
}

/** merge CssPsedoProperties
 * @param {CssPsedoProperties} current
 * @param {CssPsedoProperties} extended
 */
export function merge(current, extended) {
  for (const e of Object.keys(extended)) {
    current[e] = join(current[e], extended[e]);
  }
  return current;
}

/**
 * @param {React.CSSProperties[]} css
 * @returns {React.CSSProperties}
 */
export function join(...css) {
  if (css.length == 1) return css[0];
  return Object.assign({}, ...css);
}

/**
 * @returns {TranslatedCss}
 */
export function getTranslatedCss() {
  return c._css.getTranslatedCss();
}

export function uuid() {
  return `ap${v1().replace("-", "")}`;
}
