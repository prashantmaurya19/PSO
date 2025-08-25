


export async function checkHealthRequest() {
  const res = await fetch("http://localhost:8080/ur/health/status");
  console.log(res.headers);
  const jres = await res.text();
  console.log(jres);
  if (jres.token != undefined) document.cookie += `token_id=${jres.token};`;
}

export async function loginToAuthService() {
  const headers = new Headers();
  headers.append(
    "Authorization",
    `Basic ${btoa(`xyzking10009@gmail.com:prashant`)}`,
  );
  const res = await fetch("http://localhost:8080/ur/user/login", {
    method: "POST",
    headers: headers,
  });

  console.log(res.headers);
  const jres = await res.json();
  console.log(jres);
  if (jres.token != undefined)
    document.cookie = `token_id=${jres.token};${document.cookie}`;
}
