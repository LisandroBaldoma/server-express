### Features

- Servidor Backend E-commerce.

### DESAFÍO ENTREGABLE 

## Segunda practica integradora

- Se Actualizo el modelo de User con los campos requeridos y al momento de registrarse exitosamente se asigna un carrito unico para ese usuario.
- Se implemento la ruta http://localhost:8080/api/sessions/current donde se muestra solo un JSON con todos los datos del usuario en sesion local


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
- Ejecutar el archivo testingCrear.js "node testingCrear.js" (Este archivo va a cargar los productos y carritos)
- Ejecutar el servidor "npm test".

#### Tercer paso ( Probar servidor )
- DESAFÍO ENTREGABLE - PROCESO DE TESTING

#### Cuarto paso ( Eliminar Productos  Carritos y usuarios de la BD )
-  Una vez termiando con las pruebas puede eliminar los productos de la BD
- Ejecutar el archivo testingEliminar.js "node testingEliminar.js".


###EndPoint User-
- http://localhost:8080 (home) Vista protegida
- http://localhost:8080/login    
   - Registro de usuario
   - Login Usuario Registrado Local
   - Login Github
- http://localhost:8080/profile (Datos Perfil) Vista Protegida
- http://localhost:8080/products (Lista de productos) Vista protegida
- http://localhost:8080/api/sessions/current (Datos session) Vista Protegida 

------------

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
- http://localhost:8080/api/products/:id
POST AddProduct
- http://localhost:8080/api/products
PUT UpdateProduct
- http://localhost:8080/api/products/:id
DEL DeleteProduct
- http://localhost:8080/api/products/:id

# EndPoint Carts
POST AddCart
- http://localhost:8080/api/carts/
POST AddProductToCart
- http://localhost:8080/api/carts/:cid/product/:pid
GET ProductCart
- http://localhost:8080/api/carts/:cid **(Implemente Populate)**
DEL DeleteProductCart
- http://localhost:8080/api/carts/:cid/product/:pid
DEL DeleteAllProductCart
- http://localhost:8080/api/carts/:cid
PUT UpdateProductsCart 
- http://localhost:8080/api/carts/:cid
PUT UpdateQuantityCartProduct 
- http://localhost:8080/api/carts/:cid/product/:pid

# View 

- http://localhost:8080/
	 Esta vista en solo el HOME del proyecto. 

- http://localhost:8080/products
	En esta vista Se puede 

- Agregar Productos nuevos AddProduct
- Agregar productos al carrito que por defecto utiliza el que se creo anteriormente en el "Segundo paso"
- Se puede acceder al carrito de compras con el detalle de los productos que se agregaron al carrito
- Cuenta con Paginacion 

- http://localhost:8080/carts/:cid
	En esta vista se puede acceder al detalle de cualquier carrito que quiera consultar 

# Testing ( Coleccion Postman para realizar los testing a todos los EndPoint )
- En la carpeta src/test/postman/E-commerce Backend Server.postman_collection.js
- Podes importar la coleccion en POSTMAN y realizar los TEST a los endPoint



###End