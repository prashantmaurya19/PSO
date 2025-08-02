/** get random number in given range
 * @param {number} min - minimum number
 * @param {number} max - maximum number
 */
export function getRandomInteger(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** get a random element from a array
 * @param {Array} arr
 */
export function getRandomElement(arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
}

export default { getRandomInteger };
