import { Stomp, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class SocketHandler {
  constructor() {
    console.log("%chandler created", "color: green;font-size: 20px");
    this.socket = null;
    this.stomp_client = null;
    this.is_connected = false;
    this.subscribtions = new Map();
  }

  /**
   * @param {Function} func
   * @returns {Function}
   */
  attachSelfToFunction(func) {
    return func.bind(this);
  }

  isConnected() {
    return this.stomp_client && this.is_connected;
  }

  /**
   * @param {...{topic:string,onSubscribe:function(string):void}} endpoints - endpoints to subscribe
   */
  subscribe(...endpoints) {
    if (!this.isConnected()) return;

    endpoints.forEach((e) => {
      if (this.subscribtions.has(e.topic)) return;
      this.subscribtions.set(
        e.topic,
        this.stomp_client.subscribe(e.topic, e.onSubscribe),
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
   * @param {function():void} onConnect - callback for onConnect
   * @param {function():void} onDisconnect - callback for onDisconnect
   */
  connect(url, onConnect, onDisconnect) {
    if (this.socket != null) return;
    console.log("%cin SocketHandler.connect", "color: yellow;font-size: 20px");
    this.socket = new SockJS(url);
    this.stomp_client = Stomp.over(() => this.socket);

    this.stomp_client.connect(
      {},
      this.attachSelfToFunction(function (frame) {
        this.is_connected = true;
        console.log("Connected: " + frame);
        onConnect(frame);
      }),
      this.attachSelfToFunction(function (error) {
        console.error("WebSocket connection error: " + error);
        this.is_connected = false;
        onDisconnect();
      }),
    );

    this.stomp_client.onDisconnect = this.attachSelfToFunction(function () {
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

const handler = new SocketHandler();

export default handler;
