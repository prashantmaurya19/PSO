import React from "react";
import c from "./_const";
import { v1 } from "uuid";

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
  let id = uuid();
  css(id, props);

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
