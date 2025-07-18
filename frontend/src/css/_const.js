// import { debug } from "../util/log";
/**
 * @type {Object}
 * @property {CssPsedoPropertiesManager} _css
 */
const M = {};

class CssPsedoPropertiesManager {
  constructor() {
    /**
     * @type {Object.<string,React.CSSProperties>}
     */
    this._css = {};
  }

  /**
   * @param {string} id
   * @returns {CssPsedoProperties}
   */
  getStyle(id) {
    return this._css[id];
  }

  /** translate css property to string
   * @param {React.CSSProperties} style
   * @returns {TranslatedCss}
   */
  translate(style) {
    let cssString = "";
    for (const property in style) {
      if (style.hasOwnProperty(property)) {
        const cssProperty = property.replace(
          /([A-Z])/g,
          (g) => `-${g[0].toLowerCase()}`,
        );
        cssString += `${cssProperty}: ${style[property]}; `;
      }
    }
    return cssString;
  }

  /**
   * @returns {TranslatedCss}
   */
  getTranslatedCss() {
    // debug(CssPsedoPropertiesManager.count);
    // console.log(this._css)
    let ans = "";
    for (let i of Object.keys(this._css)) {
      for (const e in this.getStyle(i)) {
        if (e == "&") {
          ans += `
#${i} {${this.translate(this.getStyle(i)[e])}}
`;
        } else {
          ans += `
#${i}:${e} {${this.translate(this.getStyle(i)[e])}}
`;
        }
      }
    }
    return ans;
  }

  /** remove style for element
   * @param {string} id - uuid of element
   */
  remove(id) {
    this._css[id] = undefined;
  }

  /** add and update style for a element
   * @param {string} id - uuid of element
   * @param {CssPsedoProperties} style - translated css string
   */
  add(id, style) {
    this._css[id] = style;
  }
}

M._css = new CssPsedoPropertiesManager();

export default M;
