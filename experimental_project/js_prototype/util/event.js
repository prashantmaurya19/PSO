/**
 * all event related activity handled here
 * TODO: i can also create contexts to support async work
 */

import { useEffect } from "react";
import { pmlog } from "./log";

/**
 * @type {Record<EventName,string>}
 */
export const Events = {
  PLAYER_OPONENT_DATA_UPDATED: "PLAYER_OPONENT_DATA_UPDATED",
  PLAYER_DATA_UPDATED: "PLAYER_DATA_UPDATED",
  SOCKET_GAME_EVENT_RECIVED: "SOCKET_GAME_EVENT_RECIVED",
  SOCKET_GAME_EVENT_SENDED: "SOCKET_GAME_EVENT_SENDED",
  SOCKET_GAME_REQUEST_SENDED: "SOCKET_GAME_REQUEST_SENDED",
  GAME_INITIALIZED: "GAME_INITIALIZED",
  GAME_STARTED: "GAME_STARTED",
  BOARD_MOVE_PLAYED: "BOARD_MOVE_PLAYED",
  BOARD_PROMOTION_PIECE_SELECTED: "BOARD_PROMOTION_PIECE_SELECTED",
};

/**
 * @typedef {"PLAYER_OPONENT_DATA_UPDATED"|"PLAYER_DATA_UPDATED"|"SOCKET_GAME_EVENT_RECIVED"|"SOCKET_GAME_EVENT_SENDED"|"SOCKET_GAME_REQUEST_SENDED"|"GAME_INITIALIZED"|"GAME_STARTED"|"BOARD_PROMOTION_PIECE_SELECTED"|"BOARD_MOVE_PLAYED"} EventName
 */

/**
 * @typedef {Function} Listener
 */
class Event {
  /**
   * @param {EventName} name - name of event
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
  exist(func) {
    return this.callbacks.indexOf(func) != -1;
  }

  /** add function to callbacks list
   * @param {Listener} func - function
   */
  add(func) {
    if (this.exist(func)) return;
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
    this.callbacks.forEach((v) => {
      v(...args);
    });
  }
}

class EventManager {
  /**
   * init all events in Events enum
   */
  #initEvents() {
    for (const i in Events) {
      // use this.init(i) method if existens check is requried
      this.add(i);
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
   * @returns {Event|undefined}
   */
  get(name) {
    return this.events[name];
  }

  /** return true if event exist false otherwise
   * @param {EventName} name - name of event
   * @returns {boolean}
   */
  exist(name) {
    return this.get(name) != undefined;
  }

  /**
   * initialize the event object if event not present
   * @param {EventName} name - name of the event
   */
  init(name) {
    if (this.exist(name)) return;
    this.add(name);
  }

  /** create event
   * @param {EventName} name - event name
   */
  add(name) {
    this.events[name] = new Event(name);
  }

  /** listen for event
   * @param {EventName} name
   * @param {Listener} func
   */
  listen(name, func) {
    this.get(name).add(func);
  }

  /**
   * @param {EventName} name - event name
   * @param {...object} args - args to listeners
   */
  emit(name, ...args) {
    this.get(name).call(args);
  }
}

const event_manager = new EventManager();

/** emit a event
 * [Note:] events cannot be emmited from a listener
 * @param {EventName} name
 * @param {object} args
 */
export function emit(name, args) {
  event_manager.emit(name, args);
}

export function clearAll() {
  for (const i in Events) {
    event_manager.get(i)?.clear();
  }
}

/**
 * remove the lister
 * @param {EventName} name - name of event
 * @param {Listener} func
 */
export function clear(name, func) {
  event_manager.get(name).remove(func);
}

/**
 * @param {EventName} name
 * @param {Listener} func
 */
export function listen(name, func) {
  event_manager.listen(name, func);
}

/** wrap listener in useEffect hook for better clean up
 * @param {EventName} name - name of event
 * @param {Listener} listener
 */
export function useListen(name, listener) {
  useEffect(() => {
    listen(name, listener);
    return () => {
      clear(name, listener);
    };
  }, [listener]);
}
