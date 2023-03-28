const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  console.log(data);
  let obj = {};
  data.forEach((value, key) => (obj[key] = value));
  if (obj.email == "adminCoder@coder.com" && obj.password == "adminCod3r123") {
    obj = { ...obj, role: "admin" };
  } else {
    obj = { ...obj, role: "user" };
  }
  console.log("Objeto formado:");
  console.log(obj);
  fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 400) {
      window.alert("Data already exists");
    }
    if (result.status === 201) {
      window.alert("you have registered successfully, please log in");
      window.location.replace("/users/login");
    }
  });
});
