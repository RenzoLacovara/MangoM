const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        window.alert("You have successfully logged in!");
        window.location.replace("/api/products");
      }
      if (result.status === 401) {
        window.alert("Invalid login credentials");
      }
    })
    .catch((error) => {
      window.alert("Error: " + error);
    });
});