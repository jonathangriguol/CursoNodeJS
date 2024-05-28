const form = document.getElementById("forgotPassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const fetchParams = {
    url: "/auth/forgot-password",
    headers: {
      "Content-type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(obj),
  };

  fetch(fetchParams.url, {
    headers: fetchParams.headers,
    method: fetchParams.method,
    body: fetchParams.body,
  })
    .then((response) => {
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
