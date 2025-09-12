/** check if a character is in Uppercase
 * @return {boolean}
 */
export function isLowerCase(char) {
  const code = char.charCodeAt(0);
  return code > 96 && code < 123;
}

/** check if a character is in Uppercase
 * @return {boolean}
 */
export function isUpperCase(char) {
  const code = char.charCodeAt(0);
  return code > 64 && code < 91;
}

/** return the index of nth occurenc of a char
 * and return -1 of char not has n occurenc in s
 * @param {string} s
 * @param {string} char - occurenc string
 * @param {number} n - nth
 * @returns {number}
 */
export function indexOfNthOccurrence(s, char, n) {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = s.indexOf(char, index + 1);
  }
  return index;
}

/** insert the payload at index of s and return mutated string
 * @param {string} s - target string
 * @param {number} index - index of insertion
 * @param {string} payload
 * @returns {string}
 */
export function insertAt(s, index, payload) {
  return s.substring(0, index) + payload + s.substring(index);
}

/**
 * {JSDoc}
 *
 * The splice() method changes the content of a string by removing a range of
 * characters and/or adding new characters.
 *
 * @param {number} index after index n
 * @param {number} del An integer indicating the number of old chars to remove.
 * @param {string} payload The String that is spliced in.
 * @return {string} A new string with the spliced substring.
 */
export function splice(s, index, del, payload) {
  return s.slice(0, index) + payload + s.slice(index + Math.abs(del));
}
