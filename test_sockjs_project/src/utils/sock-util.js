import { useState, useEffect, useReducer, useRef, useCallback } from "react";
import { Stomp, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CLIENT":
//       return { ...state, client: action.payload };
//     case "ADD_SUBSCRIPTION":
//       return {
//         ...state,
//         subscriptions: new Map(state.subscriptions).set(
//           action.payload.destination,
//           action.payload.subscription,
//         ),
//       };
//     case "REMOVE_SUBSCRIPTION":
//       const updatedSubscriptions = new Map(state.subscriptions);
//       updatedSubscriptions.delete(action.payload);
//       return { ...state, subscriptions: updatedSubscriptions };
//     case "CLEAR_CLIENT":
//       return { client: null, subscriptions: new Map() };
//     default:
//       return state;
//   }
// };

// export const useWebSocketService = (
//   webSocketUrl,
//   onConnectCallback,
//   onErrorCallback,
// ) => {
//   const [state, dispatch] = useReducer(reducer, {
//     client: null,
//     subscriptions: new Map(),
//   });

//   const clientRef = (useRef < Client) | (null > null);
//   const isConnected = useRef(false);

//   useEffect(() => {
//     clientRef.current = state.client;
//   }, [state.client]);

//   const connect = useCallback(() => {
//     if (state.client || isConnected.current) return;

//     const client = new Client({
//       webSocketFactory: () => new SockJS(webSocketUrl),
//       debug: (str) => console.log("debugLog", str),
//       reconnectDelay: 5000,
//       heartbeatIncoming: 1000,
//       heartbeatOutgoing: 1000,
//       onConnect: () => {
//         isConnected.current = true;
//         console.log("WebSocket connected");
//         onConnectCallback();
//       },
//       onStompError: (error) => {
//         onErrorCallback(error.headers["message"] || "Unknown error");
//       },
//     });

//     client.activate();
//     dispatch({ type: "SET_CLIENT", payload: client });
//   }, [state.client, webSocketUrl, onConnectCallback, onErrorCallback]);

//   const subscribe = useCallback(
//     (destination, callback) => {
//       const client = clientRef.current;
//       if (!client || !isConnected.current) return;

//       if (state.subscriptions.has(destination)) return;

//       const subscription = client.subscribe(destination, (message) => {
//         if (message.body) callback(JSON.parse(message.body));
//       });

//       dispatch({
//         type: "ADD_SUBSCRIPTION",
//         payload: { destination, subscription },
//       });
//     },
//     [state.subscriptions],
//   );

//   const send = useCallback((destination, body) => {
//     const client = clientRef.current;
//     if (!client || !isConnected.current) return;
//     client.publish({ destination, body: JSON.stringify(body) });
//   }, []);

//   const unsubscribe = useCallback(
//     (destination) => {
//       const subscription = state.subscriptions.get(destination);
//       if (subscription) {
//         subscription.unsubscribe();
//         dispatch({ type: "REMOVE_SUBSCRIPTION", payload: destination });
//       }
//     },
//     [state.subscriptions],
//   );

//   const disconnect = useCallback(() => {
//     const client = clientRef.current;
//     if (client && isConnected.current) {
//       state.subscriptions.forEach((subscription) => subscription.unsubscribe());
//       client.deactivate();
//       dispatch({ type: "CLEAR_CLIENT" });
//       isConnected.current = false;
//     }
//   }, [state.subscriptions]);

//   return { connect, subscribe, send, unsubscribe, disconnect };
// };

/**
 * @function
 * @param {string} url
 * @param {Array.<string>} topics
 * @param {function(string):void} onMessageCallback
 * @returns {{isConnected: boolean,sendMessage:function(string,string):void }}
 */
export const useSockJSConnection = (url, topics, onMessageCallback) => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    console.log("in useSockJSConnection ");
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      function (frame) {
        console.log("Connected: " + frame); // Log the successful connection
        setIsConnected(true);
        topics.forEach((topic) => {
          stompClient.subscribe(topic, (message) => {
            onMessageCallback(JSON.parse(message.body));
          });
        });
      },
      function (error) {
        console.error("WebSocket connection error: " + error); // Log WebSocket errors
        setIsConnected(false);
      },
    );

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
  }, []);

  const sendMessage = (destination, message) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish({ destination, body: JSON.stringify(message) });
    }
  };

  return { isConnected, sendMessage };
};

// Usage in a React component:
// const { isConnected, sendMessage } = useSockJSConnection('http://localhost:8080/ws', ['/topic/messages'], (msg) => console.log(msg));
