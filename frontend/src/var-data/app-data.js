export const REQUESTS = {
  open_game_requests: 0,
};

/** return number of open game requests
 * @returns {number}
 */
export function getOpenGameRequests() {
  return REQUESTS.open_game_requests;
}

/** it inc the open_game_requests count
 */
export function incGameRequests() {
  REQUESTS.open_game_requests++;
}

/** it dec the open_game_requests count
 */
export function decGameRequests() {
  REQUESTS.open_game_requests++;
}
