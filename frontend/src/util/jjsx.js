/**
 * this module provide jsx element related utility
 */

/**
 * @typedef {import("react").HTMLProps & import("react").HTMLAttributes} JSXElement
 */

/** this function dosn't set a atrribute value
 * insted of that it all markes them
 * eg (data-clicked, data-checked ...etc)
 *
 * and remove atrribute if it present and
 * set set attribute if it not present (like toggle)
 *
 * @param {HTMLElement} e - target element
 * @param {string} name - name of the atrribute
 */
export function toggleJsxAtrribute(e, name) {
  if (e.hasAttribute(name)) {
    e.removeAttribute(name);
  } else {
    e.setAttribute(name, "");
  }
}
