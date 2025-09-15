import { isTypeOf } from "@pso/util/types.js";

/** return combined from and to object
 * @param {object} from
 * @param {object} to
 * @returns {object}
 */
export function combine(from, to) {
  return { ...from, ...to };
}

/**
 * @param {object} from
 */
export function clone(from) {
  return structuredClone(from);
}

/** copy values from object a to b
 * [NOTE: array is not copied insted same array shared the reference]
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

/** put if property is undefined
 * @param {object} o - target object
 * @param {string} name - name of property
 * @param {object} value
 */
export function putIfUndefined(o, name, value) {
  if (o[name] == undefined) o[name] = value;
}
