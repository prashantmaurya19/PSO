import ChessGridBG from "../../background/chess_grid";
import NavBar, { NavButton } from "../../header/navbar";
import LoginForm from "./form";
import { FontAwesomeChessPieceProvider } from "../../../impl/chess_piece_providers";

export default function LoginPage() {
  const pieceProvider = new FontAwesomeChessPieceProvider();
  return (
    <div className="h-[100vh] w-[100vw] bg-bg flex justify-center items-center relative overflow-hidden">
      <ChessGridBG
        className="w-[220vh] aspect-square transform-[rotate(45deg)] absolute"
        chess_piece_provider={pieceProvider}
      ></ChessGridBG>

      <div className="z-10 w-full absolute h-full">
        <NavBar>
          <NavButton to="/">Home</NavButton>
          <NavButton>About</NavButton>
        </NavBar>
        <div className="w-full h-[var(--page-sub-section-height)] flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
