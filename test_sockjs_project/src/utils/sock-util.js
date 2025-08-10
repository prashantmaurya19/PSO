import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

/**
 * @function
 * @param {string} url
 * @param {Array.<string>} topics
 * @param {function(string):void} onMessageCallback
 * @returns {[boolean,function(string,string):void]}
 */
export const useSockJSConnection = (url, topics, onMessageCallback) => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS(url);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      // ... other STOMP client configurations
    });

    stompClient.onConnect = () => {
      setIsConnected(true);
      topics.forEach((topic) => {
        stompClient.subscribe(topic, (message) => {
          onMessageCallback(JSON.parse(message.body));
        });
      });
    };

    stompClient.onDisconnect = () => {
      setIsConnected(false);
    };

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [url, topics]);

  const sendMessage = (destination, message) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish({ destination, body: JSON.stringify(message) });
    }
  };

  return { isConnected, sendMessage };
};

// Usage in a React component:
// const { isConnected, sendMessage } = useSockJSConnection('http://localhost:8080/ws', ['/topic/messages'], (msg) => console.log(msg));
