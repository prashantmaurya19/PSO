import ChessGridBG from "../../background/chess_grid";
import NavBar, { NavButton } from "../../header/navbar";
import LoginForm from "./form";
import { FontAwesomeChessPieceProvider } from "../../../impl/chess_piece_providers";

export default function LoginPage() {
  const pieceProvider = new FontAwesomeChessPieceProvider();
  return (
    <div className="bg-transparent h-full w-full">
      <NavBar>
        <NavButton to="/">Home</NavButton>
        <NavButton>About</NavButton>
      </NavBar>
      <div className="w-full h-[var(--page-sub-section-height)] flex justify-center items-center relative">
        <ChessGridBG
          className="absolute"
          chess_piece_provider={pieceProvider}
        ></ChessGridBG>
        <LoginForm className="z-10" />
      </div>
    </div>
  );
}
