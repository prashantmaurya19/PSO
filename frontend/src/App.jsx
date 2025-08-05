import IndexPage from "./components/pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login";
import RegistrationPage from "./components/pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
