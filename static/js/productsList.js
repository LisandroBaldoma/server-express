const serverSocket = io();

// btn form addProducts
const btnAddProductForm = document.getElementById("btnAddProductForm");
btnAddProductForm.addEventListener("blur", (e) => {
  form.classList.remove("was-validated");
});
btnAddProductForm.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
    if (form.checkValidity()) {
      const newProduct = crearProduct();
      //console.log(newProduct);
      serverSocket.emit("createNewProduct", newProduct);
    }
  },
  false
);

// form addProducts
const form = document.querySelector(".needs-validation");

// input form addProduct
const title = document.getElementById("title");
const description = document.getElementById("description");
const stock = document.getElementById("stock");
const code = document.getElementById("code");
const price = document.getElementById("price");
const statuss = document.getElementById("status");
const thumbnails = document.getElementById("thumbnails");
const category = document.getElementById("category");

// Modal Form AddProduct
const myModal = new bootstrap.Modal("#exampleModal");

const tableContainer = document.getElementById("tableContainer");

const plantillabodyProductsList = `
<table id="example" class="table table-sm table-hover table-bordered" style="width:100%">
<div class="d-flex justify-content-center">
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Add Product
  </button>
</div>
<thead>
  <tr>
    <th>Id</th>
    <th>Title</th>
    <th>Description</th>
    <th>Stock</th>
    <th>Code</th>
    <th>Price</th>
    <th>Status</th>
    <th>thumbnails</th>
    <th>Category</th>
    <th>Accion</th>
  </tr>
</thead>
<tbody id="bodyProductsList">        
  {{#if products}}
    {{#each productsList}}
      <tr>
        <th>{{this.id}}</th>
        <td>{{this.title}}</td>
        <td>{{this.description}}</td>
        <td>{{this.stock}}</td>
        <td>{{this.code}}</td>
        <td>{{this.price}}</td>
        <td>{{this.status}}</td>
        <td>{{this.thumbnails}}</td>
        <td>{{this.category}}</td>
        <td>          
          <button class="btn btn-danger" type="button" id="{{this.id}}" name="deleteProduct"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg></button>
        </td>
      </tr>
    {{/each}}
  {{else}}
    <p>No hay productos para mostrar</p>
  {{/if}}
</tbody>
</table>
`;
const armarHtmlProductsList = Handlebars.compile(plantillabodyProductsList);

serverSocket.on("productList", (products) => {
  if (tableContainer) {
    let html = armarHtmlProductsList({
      productsList: products,
      products: products.length > 0,
    });
    tableContainer.innerHTML = html;
    inicializarDataTable();
    addEventBtnDelete();
  }
});
serverSocket.on("error", (mensaje) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: mensaje.mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
});
serverSocket.on("addProductSucces", (mensaje) => {
  clearForm();
  myModal.toggle();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: mensaje.mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
});
serverSocket.on("deleteProductSucces", (mensaje) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: mensaje.mensaje,
    showConfirmButton: false,
    timer: 2000,
  });
});

function inicializarDataTable() {
  $(document).ready(function () {
    $("#example").DataTable();
  });
}
function addEventBtnDelete() {
  const btnDelete = document.getElementsByName("deleteProduct");

  for (let btn of btnDelete) {
    btn.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          serverSocket.emit("deleteProduct", btn.id);
        }
      });
    });
  }
}
function crearProduct() {
  const newProduct = {
    title: title.value,
    description: description.value,
    stock: stock.value,
    code: code.value,
    price: price.value,
    status: statuss.value,
    thumbnails: thumbnails.value,
    category: category.value,
  };
  return newProduct;
}
function clearForm() {
  title.value = "";
  description.value = "";
  stock.value = "";
  code.value = "";
  price.value = "";
  status.value = "";
  thumbnails.value = "";
  category.value = "";
  form.classList.remove("was-validated");
}
