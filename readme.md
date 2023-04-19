### SEGUNDA ENTREGA PROYECTO FINAL

Segunda Entrega Proyecto Final.

# EndPoint Products

GET Products
http://localhost:8080/api/products **(implemente Paginate-V2)**
Get ProductById
http://localhost:8080/api/products/:id
POST AddProduct
http://localhost:8080/api/products
PUT UpdateProduct
http://localhost:8080/api/products/:id
DEL DeleteProduct
http://localhost:8080/api/products/:id

# EndPoint Carts
POST AddCart
http://localhost:8080/api/carts/
POST AddProductToCart
http://localhost:8080/api/carts/:cid/product/:pid
GET ProductCart
http://localhost:8080/api/carts/:cid **(Implemente Populate para mostrar el resultado)**
DEL DeleteProductCart
http://localhost:8080/api/carts/:cid/product/:pid
DEL DeleteAllProductCart
http://localhost:8080/api/carts/:cid
PUT UpdateProductsCart **(NO ESTA IMPLEMENTADO)**
http://localhost:8080/api/carts/:cid
PUT UpdateQuantityCartProduct **(NO ESTA IMPLEMENTADO)**
http://localhost:8080/api/carts/:cid/product/:pid

# View 
http://localhost:8080/products
Lista de Productos
En esta vista Se puede 

Agregar Productos nuevos AddProduct

Agregar productos al a un carrito HarCodeado: Lo implemente de esta forma por razones de tiempo para hacer la prueba modificaar la variable cartId en la linea 23 del archivo **"productsListF.js"**

Carrito de Compras: Solo devuelve un json con los productos que se agregaron por medio del BOTON AddCart

En la vista falto implementar la pagincion,

# Persistencia Datos
MongoDB

# Observaciones
Las vistas no estan terminadas completamente, los Test de los endPoint los hice con PostMan.
Falto implementar paginacion en las vistas 
Falto la vista detalle del carrito







```

###End