import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { clearAll } from "./util/event.js";

gsap.registerPlugin(useGSAP);

clearAll();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
