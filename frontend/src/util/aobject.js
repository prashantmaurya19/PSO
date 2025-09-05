import { isTypeOf } from "./types";

/** copy values from object a to b
 * @param {object} a
 * @param {object} b
 */
export function copy(a, b, create_object = false) {
  for (const i in a) {
    if (isTypeOf(a[i], Array)) {
      console.warn(
        "array is not copied insted same array shared the reference",
      );
    }
    if (isTypeOf(a[i], Object)) {
      if (b[i] == undefined && create_object) {
        b[i] = {};
      }
      if (b[i] != undefined) copy(a[i], b[i], create_object);
    }
    b[i] = a[i];
  }
}
