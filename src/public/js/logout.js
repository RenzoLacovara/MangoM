const logOut = document.getElementById("logout");

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/users/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        window.alert("You have successfully logged out!");
        window.location.replace("/users/login");
      }
      if (result.status === 401) {
        window.alert("error logging out");
      }
    })
    .catch((error) => {
      window.alert("Error: " + error);
    });
});
