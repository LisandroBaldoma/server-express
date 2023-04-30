console.log("conectado add product");

const formAddProduct = document.querySelector("#formAddProduct");
const buttonAddCart = document.getElementsByClassName("btnAddCart");
const linKCarritoCompra = document.querySelector("#carritoCompra");
const cartTestingId = document.querySelector("#cartTesting");
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

if (formAddProduct instanceof HTMLFormElement) {
  formAddProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formAddProduct);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      myModal.toggle();
      alert("El producto se agrego con exito");
    });
  });
}

if (buttonAddCart) {
  for (let btn of buttonAddCart) {
    btn.addEventListener("click", () => {
      fetch(
        `http://localhost:8080/api/carts/${cartTestingId.value}/product/${btn.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) =>
          alert(
            `El producto: ${btn.id}, se agrego con exito en el carrito de Testing ${cartTestingId.value}`
          )
        )
        .catch((error) => console.log(error));
    });
  }
}
linKCarritoCompra.href = `http://localhost:8080/carts/${cartTestingId.value}`;


const formLogout = document.querySelector('#formLogout2')

if (formLogout instanceof HTMLFormElement) {
  formLogout.addEventListener('submit', async event => {
    event.preventDefault()

    const { status } = await fetch('http://localhost:8080/api/sessions/logout', {
      method: 'POST'
    })

    if (status === 200) {
      window.location.href = '/login'
    } else {
      console.log('[logout] estado inesperado: ' + status)
    }

  })
}
