import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@pso/App.jsx";
import "@pso/index.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Provider } from "react-redux";
import { store } from "@pso/store";
import { clearAll } from "@pso/util/event.js";

gsap.registerPlugin(useGSAP);

clearAll();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
