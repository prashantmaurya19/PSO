async function loginToAuthService() {
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
}
