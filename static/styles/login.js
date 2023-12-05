const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  import("./users.js").then((response) => {
    let users = response.default;

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    users.map((u) =>
      u.username === username && u.password === password
        ? location.assign("http://localhost:5000/main")
        : alert("Incorrect Login Information")
    );
  });
});
