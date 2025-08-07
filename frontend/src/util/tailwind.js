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

export default { join };
