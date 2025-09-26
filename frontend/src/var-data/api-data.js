export const SOCKET_GAME_REQUEST_ENDPOINT = "/w1/game_request";
export const SOCKET_GAME_EVENT_ENDPOINT = "/w1/game_event";
export class GameEventAction {
  static INIT = "init";
  static MOVE_PLAYED = "move_played";
}
