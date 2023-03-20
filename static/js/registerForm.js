//alert("ahora a trabajar con los datos del formulario")

const btn = document.getElementById("btn-submit");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const form = document.querySelector(".needs-validation");

btn.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
    if (form.checkValidity()) {
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
        .then((response) => alertExito(response.respuesta))
        .catch((error) => console.log(error));

      clearForm();
    }
  },
  false
);

function alertExito(respuesta){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: respuesta,
    showConfirmButton: false,
    timer: 2000
  })
}

function clearForm() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  form.classList.remove("was-validated");
}
