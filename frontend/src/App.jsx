import IndexPage from "./components/pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login";

function App() {
  return (
    <div className="bg-bg w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
