import "react";
import ShogiBoard from "./ShogiBoard";

export function LoginForm() {
  /**
   * @param {HTMLElement} e - an button
   */
  const click = (e) => {
    fetch("./api/auth")
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        return response.json();
      })
      .then((data) => {
	console.log(data);
      })
      .catch((error) => {
	console.log(error);
      });
  };

  return (
    <div id="login--form">
      <h2>Have a Account?</h2>
      <form action="." method="get">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" onClick={click}>
          Login
        </button>
      </form>
      <div className="signup-link">
        <a href="#">Sign Up</a>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div id="login">
      <ShogiBoard />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
