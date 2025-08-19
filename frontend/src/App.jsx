import IndexPage from "./pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/register";
import { DashBoard } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
