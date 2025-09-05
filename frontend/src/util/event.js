/**
 * all event related activity handled here
 * TODO: i can also create contexts to support async work
 */

/**
 * @enum
 * @readonly
 */
export const Events = {
  PLAYER_OPONENT_DATA_UPDATED: "_player_oponent_data_updated_",
  PLAYER_DATA_UPDATED: "_player_oponent_data_updated_",
  SOCKET_GAME_EVENT_RECIVED: "_socket_game_event_recived_",
  SOCKET_GAME_EVENT_SENDED: "_socket_game_event_sended_",
  SOCKET_GAME_REQUEST_SENDED: "_socket_game_request_sended_",
  GAME_INITIALIZED: "_game_initialized_",
  GAME_STARTED: "_game_started_",
  BOARD_MOVE_PLAYED: "_board_move_played_",
};

/**
 * @typedef {Function} Listener
 */
class Event {
  /**
   * @param {string} name - name of event
   */
  constructor(name) {
    this.name = name;
    /**
     * @type {Array<Listener>}
     */
    this.callbacks = [];
  }

  /** add function to callbacks list
   * @param {Listener} func - function
   */
  add(func) {
    this.callbacks.push(func);
  }

  /** remove function to callbacks list
   * @param {Listener} func - function
   */
  remove(func) {
    this.callbacks = this.callbacks.filter((v) => v != func);
  }

  clear() {
    this.callbacks = [];
  }

  /** call all listerners
   * @param {Array<Object>} args
   */
  call(args) {
    this.callbacks.forEach((v) => v(...args));
  }
}

class EventManager {
  /**
   * init all events in Events enum
   */
  #initEvents() {
    for (const i in Events) {
      // use this.init(i) method if existens check is requried
      this.add(Events[i]);
    }
  }

  constructor() {
    /**
     * @type {Array<Event>}
     */
    this.events = {};
    this.#initEvents();
  }

  /**
   * @returns {Event}
   */
  get(name) {
    return this.events[name];
  }

  /** return true if event exist false otherwise
   * @param {string} name - name of event
   * @returns {boolean}
   */
  exist(name) {
    return this.get(name) != undefined;
  }

  /**
   * initialize the event object if event not present
   * @param {string} name - name of the event
   */
  init(name) {
    if (this.exist(name)) return;
    this.add(name);
  }

  /** create event
   * @param {Events} name - event name
   */
  add(name) {
    this.events[name] = new Event(name);
  }

  /** listen for event
   * @param {string} name
   * @param {Listener} func
   */
  listen(name, func) {
    this.get(name).add(func);
  }

  /**
   * @param {string} name - event name
   * @param {...object} args - args to listeners
   */
  emit(name, ...args) {
    this.get(name).call(args);
  }
}

const event_manager = new EventManager();

/** emit a event
 * [Note:] events cannot be emmited from a listener
 * @param {Events} name
 * @param {object} args
 */
export function emit(name, args) {
  event_manager.emit(name, args);
}

/**
 * @param {Events} name
 * @param {Listener} func
 */
export function listen(name, func) {
  event_manager.listen(name, func);
}
