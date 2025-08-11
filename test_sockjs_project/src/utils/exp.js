export async function loginToAuthService() {
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

  console.log(res.headers);
  const jres = await res.json();
  console.log(jres);
  document.cookie += `token_id=${jres.token};`;
}
