import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class MessageHandler {
  static decoder = new TextDecoder("utf-8"); // Specify the encoding
  #msg = "";
  /**
   * @param {object} msg - message object in onSubscribe functions
   */
  constructor(msg) {
    /**
     * @type {string}
     */
    this.#msg = MessageHandler.decoder.decode(msg.binaryBody);
  }

  /** return on subscribe msg as text
   * @returns {string}
   */
  text() {
    return this.#msg;
  }

  /** pares the json message to object
   * @returns {object}
   */
  json() {
    return JSON.parse(this.#msg);
  }
}

/**
 * @typedef {function(Function):Function} JSDecorator
 * @typedef {function(string,MessageHandler):void} onSubscribeFunction
 */
export class SocketHandler {
  constructor() {
    console.log(
      "%c socket handler created ",
      "background:yellow;color: green;font-size: 14px;font-weight:900",
    );
    this.socket = null;
    this.stomp_client = null;
    this.is_connected = false;
    this.subscribtions = new Map();
    this.default_onSubscribeHandler = this.#attachOnSubscribeDecorator(
      function (topic, msg) {
        console.log(
          `%c[${topic}] message => ${msg}`,
          "color: pink;font-size: 20px",
        );
      },
      "/SocketHandler/defaultOnSubscribeHandler",
    );
  }

  /**
   * @param {Function} func
   * @returns {Function}
   */
  #attachSelfToFunction(func) {
    return func.bind(this);
  }

  /**
   * @param {onSubscribeFunction} func
   * @param {string} topic
   * @returns {onSubscribeFunction}
   */
  #attachOnSubscribeDecorator(func, topic) {
    return this.#onSubscribeDecorator.bind(this, func, topic);
  }

  /**
   * @param {onSubscribeFunction} func
   * @param {string} topic - subscribe topic
   * @param {object} message
   */
  #onSubscribeDecorator(func, topic, message) {
    return func(topic, new MessageHandler(message));
  }

  isConnected() {
    return this.stomp_client && this.is_connected;
  }

  /**
   * @param {...Partial<{topic:string,onSubscribe:onSubscribeFunction|undefined}>} endpoints - endpoints to subscribe
   */
  subscribe(...endpoints) {
    if (!this.isConnected()) return;

    endpoints.forEach((e) => {
      if (this.subscribtions.has(e.topic)) return;
      this.subscribtions.set(
        e.topic,
        this.stomp_client.subscribe(
          e.topic,
          // @ts-ignore
          e.onSubscribe == undefined
            ? this.default_onSubscribeHandler
            : this.#attachOnSubscribeDecorator(e.onSubscribe, e.topic),
        ),
      );
    });
  }

  /**
   * @param {...string} endpoints - topic destination url
   */
  unsubscribe(...endpoints) {
    if (!this.isConnected()) return;
    console.log("unsubscribe");
    endpoints.forEach((e) => {
      this.subscribtions.get(e).unsubscribe();
      this.subscribtions.delete(e);
    });
  }

  /**
   * @param {string} destination - endpoint to send the body
   * @param {object} body - message body sended as json
   */
  send(destination, body) {
    if (this.isConnected()) {
      this.stomp_client.publish({ destination, body: JSON.stringify(body) });
    }
  }

  activate() {
    if (this.stomp_client == undefined) return;
    this.stomp_client.activate();
  }

  /**
   * @param {string} url - url
   * @param {function(...object):void} onConnect - callback for onConnect
   * @param {function(...object):void} onDisconnect - callback for onDisconnect
   */
  connect(url, onConnect, onDisconnect) {
    if (this.socket != null) return;
    console.log("%cin SocketHandler.connect", "color: yellow;font-size: 20px");
    this.socket = new SockJS(url);
    this.stomp_client = Stomp.over(() => this.socket);

    this.stomp_client.connect(
      {},
      this.#attachSelfToFunction(function (frame) {
        this.is_connected = true;
        console.log("Connected: " + frame);
        onConnect(frame);
      }),
      this.#attachSelfToFunction(function (error) {
        console.error("WebSocket connection error: " + error);
        this.is_connected = false;
        onDisconnect();
      }),
    );

    // @ts-ignore
    this.stomp_client.onDisconnect = this.#attachSelfToFunction(function () {
      console.log("onDisconnect called");
      this.is_connected = false;
    });
    this.stomp_client.activate();
  }

  deactivate() {
    if (this.stomp_client) {
      this.stomp_client.deactivate();
    }
  }

  disconnect() {
    if (!this.isConnected()) return;
    this.subscribtions.forEach((e) => {
      e.unsubscribe();
    });
    this.deactivate();
  }
}

export const socket = new SocketHandler();
