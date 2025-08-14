// import socket from "./utils/sock-const";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// window.addEventListener("load", () => {
//   socket.connect(
//     "http://localhost:8080/ps/ws/v1",
//     () => {
//       socket.subscribe({
//         topic: "/t1/tdemo",
//         onSubscribe: (msg) => console.log("onSubscribe => ", msg),
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
