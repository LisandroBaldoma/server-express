console.log("conectado add product")

const formAddProduct = document.querySelector('#formAddProduct');
const buttonAddCart = document.getElementsByClassName('btnAddCart');
const linKCarritoCompra = document.querySelector('#carritoCompra');

if(formAddProduct instanceof HTMLFormElement){
    formAddProduct.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(formAddProduct)
        const data = {}
        formData.forEach((value,key) => (data[key] = value));
        fetch('/api/products', {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
    })
}

const cartId = "643e07aadf068171fb9d8193"


if(buttonAddCart){
   for(let btn of buttonAddCart ) {
    btn.addEventListener('click', ()=>{
        fetch(`http://localhost:8080/api/carts/${cartId}/product/${btn.id}`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => alert(`El producto: ${btn.id}, se agrego con exito en el carrito por defecto ${cartId}`)).catch(error => console.log(error))
        
    })
   }
}
linKCarritoCompra.href = `http://localhost:8080/api/carts/${cartId}`