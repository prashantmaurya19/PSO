import NavBar, { NavButton } from "../../header/navbar";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="bg-transparent h-full w-full">
      <NavBar>
        <NavButton to="/">Home</NavButton>
        <NavButton>About</NavButton>
      </NavBar>
      <div className="w-full h-[var(--page-sub-section-height)] flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
