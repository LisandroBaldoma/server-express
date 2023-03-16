console.log("prueba productList script JS");

const serverSocket = io("http://localhost:8080");
const btn = document.getElementById("btn-socketIO");
const form = document.querySelector(".needs-validation");
const title = document.getElementById("title");
const description = document.getElementById("description");
const stock = document.getElementById("stock");
const code = document.getElementById("code");
const price = document.getElementById("price");
const status = document.getElementById("status");
const thumbnails = document.getElementById("thumbnails");
const category = document.getElementById("category");

function crearProduct() {
  const newProduct = {
    title: title.value,
    description: description.value,
    stock: stock.value,
    code: code.value,
    price: price.value,
    status: status.value,
    thumbnails: thumbnails.value,
    category: category.value,
  };
  return newProduct;
}
function clearForm (){  
    title.value = ""
     description.value = ""
     stock.value = ""
     code.value = ""
     price.value = ""
     status.value = ""
     thumbnails.value = ""
     category.value = ""
     form.classList.remove("was-validated");
}
btn.addEventListener('blur', (e) => {
    form.classList.remove("was-validated");
})
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
        const newProduct = crearProduct();
        console.log(newProduct);
        serverSocket.emit("createNewProduct", newProduct);
        clearForm()
      }
    },
    false
  );

const plantillabodyProductsList = `
{{#if products}}
      {{#each productsList}}
        <tr>
          <th scope="row">{{this.id}}</th>
          <td>{{this.title}}</td>
          <td>{{this.description}}</td>
          <td>{{this.stock}}</td>
          <td>{{this.code}}</td>
          <td>{{this.price}}</td>
          <td>{{this.status}}</td>
          <td>{{this.thumbnails}}</td>
          <td>{{this.category}}</td>
        </tr>
      {{/each}}
    {{else}}
      <p>No hay productos para mostrar</p>
    {{/if}}
`
const armarHtmlProductsList = Handlebars.compile(plantillabodyProductsList)

serverSocket.on('productsListUpdate', products => {
    const bodyProductsList = document.getElementById('bodyProductsList')
    if(bodyProductsList){
        bodyProductsList.innerHTML= armarHtmlProductsList({productsList:products, products:products.length > 0})
    }
} )

