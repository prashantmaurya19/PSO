/** return a string with pseudo_class prefixed to twclasses
 * e.g expand("hover:","bg-red-800","text-lg") -> "hover:bg-red-800 hover:text-lg"
 * @param {string} pseudo_class - pseudo class like hover: focus: etc
 * @param {...string} twclass - tw classes
 * @returns {string}
 */
export function expandTWClass(pseudo_class, ...twclass) {
  let res = "";
  for (const cls of twclass) {
    res = res.concat(`${pseudo_class}${cls} `);
  }
  return res;
}

/** it works same as join
 * @param {...string} classes
 */
export function joinTWClass(...classes) {
  return join(...classes);
}

/**
 * @param {...string} classes
 */
export function join(...classes) {
  return classes.join(" ");
}
