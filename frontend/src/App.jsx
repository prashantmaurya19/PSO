import IndexPage from "@pso/pages/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@pso/pages/login";
import RegistrationPage from "@pso/pages/register";
import { DashBoard } from "@pso/pages/dashboard";
import { StartUpMenu } from "@pso/pages/dashboard/dmain";
import { GameDurationMenu } from "@pso/pages/dashboard/dmain/GameDurationMenu";
import { BotPlayCreateMenu } from "@pso/pages/dashboard/dmain/BotPlayCreateMenu";
import { ChessArenaGround } from "@pso/pages/dashboard/dmain/ChessArenaGround";

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
