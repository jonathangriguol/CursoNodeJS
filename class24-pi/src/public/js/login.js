const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const fetchParams = {
    url: "/auth",
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  };

  fetch(fetchParams.url, {
    headers: fetchParams.headers,
    method: fetchParams.method,
    body: fetchParams.body,
  })
    .then((response) => {
      debugger;
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            // Si es algo distinto a una redireccion, 
            // por ejemplo algun handled error
            return response.json;
        }
    })
    .then(data => console.log(data)) // Manejar 'data' como un json
    .catch(error => console.log(error));
});