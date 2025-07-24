import th from "./css/theme";
import { join, getTranslatedCss } from "./css/util";
import style from "./css/global";
import { useEffect } from "react";
import Index from "./components/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login";

function App() {
  useEffect(function () {
    let id = "pmreactcustomrenderedstylesheet";
    let ele = document.getElementById(id);
    window.style_status = true;
    if (!ele) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = getTranslatedCss();
      document.head.appendChild(style);
    }
  }, []);
  return (
    <div
      style={join({
        background: th.bg,
      })}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
