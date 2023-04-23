### Features

- Servidor Backend E-commerce.
- Segunda Entrega Proyecto Final.

#  Instrucciones para el correcto funcionamiento

#### Primer paso ( Descargar el proyecto e instalar dependencias )
- Clonar Repositorio
- npm install

#### Segundo paso ( Cargar Productos y Carrito de Testing en la BD )
- Setear el String de conexion a la BD el archivo se encuentra en la carpeta src/config/database.config.js
- Se puede optar por 2 opciones:
	MongoDB Compass
	MongoDB Atlas

- Acceder a la carpeta src
- Ejecutar el archivo testingCrear.js "node testingCrear.js" (Este archivo va a cargar los productos y carritos de prueba)
- Ejecutar el servidor "npm test".

#### Tercer paso ( Probar servidor )
- Probar el servidor y realizar los test.

#### Cuarto paso ( Elimnar Productos y Caritos de la BD )
-  Una vez termiando con las pruebas puede eliminar los productos de la BD
- Ejecutar el archivo testingEliminar.js "node testingEliminar.js".



**Table of Contents**

[TOCM]

[TOC]

###EndPoint Products

GET Products
http://localhost:8080/api/products **(implemente Paginate-V2)**
- acepta parametros opcioneales de busqueda:
	- limit: numerico
	- page: numerico
	- sort: 'desc' / 'asc'
	- query: string ( categoria el producto que desea buscar )

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
http://localhost:8080/api/carts/:cid **(Implemente Populate)**
DEL DeleteProductCart
http://localhost:8080/api/carts/:cid/product/:pid
DEL DeleteAllProductCart
http://localhost:8080/api/carts/:cid
PUT UpdateProductsCart 
http://localhost:8080/api/carts/:cid
PUT UpdateQuantityCartProduct 
http://localhost:8080/api/carts/:cid/product/:pid

# View 

http://localhost:8080/
	 Esta vista en solo el HOME del proyecto. 

http://localhost:8080/products
	En esta vista Se puede 

- Agregar Productos nuevos AddProduct
- Agregar productos al carrito que por defecto utiliza el que se creo anteriormente en el "Segundo paso"
- Se puede acceder al carrito de compras con el detalle de los productos que se agregaron al carrito
- Cuenta con Paginacion 

http://localhost:8080/carts/:cid
	En esta vista se puede acceder al detalle de cualquier carrito que quiera consultar 

# Testing ( Coleccion Postman para realizar los testing a todos los EndPoint )
- En la carpeta src/test/postman/E-commerce Backend Server.postman_collection.js



###End