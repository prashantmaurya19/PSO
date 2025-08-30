import IndexPage from "./pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/register";
import { DashBoard } from "./pages/dashboard";
import { StartUpMenu } from "./pages/dashboard/dmain";
import { GameDurationMenu } from "./pages/dashboard/dmain/GameDurationMenu";
import { BotPlayCreateMenu } from "./pages/dashboard/dmain/BotPlayCreateMenu";
import { ChessArenaGround } from "./pages/dashboard/dmain/ChessArenaGround";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<StartUpMenu />} />
          <Route path="new_game" element={<GameDurationMenu />} />
          <Route path="new_bot_game" element={<BotPlayCreateMenu />} />
          <Route path="chess_arena" element={<ChessArenaGround />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
