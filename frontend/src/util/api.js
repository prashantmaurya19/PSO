/**
 * @typedef {{username:string,port:number}} UserAddressInfo
 */

/**
 * @param {string} player_address
 * @returns {UserAddressInfo}
 */
export function parseUserAddress(player_address) {
  const s = player_address.split(":");
  return { username: s[1], port: parseInt(s[0]) };
}
