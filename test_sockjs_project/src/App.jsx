import { useState } from "react";

function App() {
  return (
    <div
      style={{
        width: "80vw",
        height: "50vh",
      }}
    >
      <span
        id="screen"
        style={{
          display: "block",
          outline: "1px solid red",
          background: "black",
          width: "100%",
          height: "50%",
          fontSize: "17px",
          textWrap: "wrap",
        }}
      ></span>
      <button
        onClick={async () => {
          const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: "prashant",
              username: "prashantmaurya109@gmail.com",
            }),
          });

          document.getElementById("screen").innerText = JSON.stringify(
            await res.json(),
            null,
            "   ",
          );
        }}
      >
        get token
      </button>
      <button
        onClick={async () => {
          const res = await fetch("http://localhost:8080/auth/user", {
            method: "GET",
          });

          document.getElementById("screen").innerText = JSON.stringify(
            await res.json(),
            null,
            "   ",
          );
        }}
      >
        Hit Me!
      </button>
    </div>
  );
}

export default App;
