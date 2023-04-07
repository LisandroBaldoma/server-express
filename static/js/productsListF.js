console.log("conectado add product")

const formAddProduct = document.querySelector('#formAddProduct');

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

console.log(formAddProduct)