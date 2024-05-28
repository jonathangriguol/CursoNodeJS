const logoutButton = document.getElementById("logout");

const fetchParams = {
  url: "/auth/logout",
};

logoutButton.addEventListener("click", (e) => {
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
