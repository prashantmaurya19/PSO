import socket from "./utils/sock-const";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// window.addEventListener("load", () => {
//   const url = "http://localhost:8080/ps/ws/v1";
//   socket.connect(
//     url,
//     () => {
//       console.log(
//         "%csubscribe: is_connected= ",
//         socket.is_connected,
//         "color: pink;font-size: 20px",
//       );
//       socket.subscribe({
//         topic: "/t1/tdemo",
//         onSubscribe: (message) => {
//           const decoder = new TextDecoder("utf-8"); // Specify the encoding
//           console.log(
//             `%c/t1/tdemo message => ${decoder.decode(message.binaryBody)}`,

//             "color: pink;font-size: 20px",
//           );
//         },
//       });
//     },
//     () => {},
//   );
// });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
