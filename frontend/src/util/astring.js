/** check if a character is in Uppercase
 * @return {boolean}
 */
export function isUppercase(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 65 && charCode <= 90;
}
