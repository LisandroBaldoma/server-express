//alert("ahora a trabajar con los datos del formulario")

const btn = document.getElementById("btn-submit");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const email = document.getElementById("email");


btn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    name: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  fetch("http://localhost:8080/api/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
});
