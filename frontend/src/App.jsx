import NavBar from "./components/header/navbar";
import th from "./css/theme";
import { join, getTranslatedCss } from "./css/util";
import style from "./css/global";
import { useEffect } from "react";
import Index from "./components/pages";

function App() {
  useEffect(function () {
    let id = "pmreactcustomrenderedstylesheet";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = getTranslatedCss();
      document.head.appendChild(style);
    }
  }, []);
  return (
    <div
      style={join(
        {
          background: th.bg,
        },
        style.full_dimension,
      )}
    >
      <NavBar />
      <Index />
    </div>
  );
}

export default App;
