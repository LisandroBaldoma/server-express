### Features

- Servidor Backend E-commerce.

## DESAFÍO ENTREGABLE 
###RESTRUCTURACION DEL SERVIDOR

### Segunda practica integradora

- Implemente  Repositories con las operaciones que se realizan en products -carts - Users para que todas las operaciones puedan  ser independientes de la persistencia que se elije al iniciar el programa.
- Implemente Services con operaciones de creacion que se realizan en prodcuts - carts - users.
- El modo Memoria solo podra usarse con Postman 
- implemente DOTENV para configurar las variables de entorno que se necesitan para el funcionamiento del servidor.
	En los archivos .env corrspondientes a cada persistencia se debera completar con los datos requeridos 
	PORT (puerto en el que escuchara el serivdor )
	MOONGODB_CONECTION_STRING (String de conexion para Mongodb)


#  Instrucciones para el correcto funcionamiento

### Primer paso ( Descargar el proyecto e instalar dependencias )
- Clonar Repositorio
- npm install

## Segundo paso ( ejecutar el comando npm para iniciar el servidor )
##se puede elegir entre 2 opciones de persistencia
		npm test ( por defecto utiliza Mongodb local)
		npm test memoria (solo para test con Postman)
		

### Tercer paso ( Probar servidor )
- DESAFÍO ENTREGABLE - PROCESO DE TESTING

###EndPoint User-
- http://localhost:8080 (home) Vista protegida
- http://localhost:8080/login    
   - Registro de usuario
   - Login Usuario Registrado Local
   - Login Github
- http://localhost:8080/profile (Datos Perfil) Vista Protegida
- http://localhost:8080/products (Lista de productos) Vista protegida
- http://localhost:8080/api/sessions/current (Datos session) Vista Protegida 

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

### EndPoint Carts
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

### View 

- http://localhost:8080/
	 Esta vista en solo el HOME del proyecto. 

- http://localhost:8080/products
	En esta vista Se puede 

- Agregar Productos nuevos AddProduct
- Agregar productos al carrito que se le asigno al usuario al registrarse
- Se puede acceder al carrito de compras con el detalle de los productos que se agregaron al carrito
- Cuenta con Paginacion 

- http://localhost:8080/carts/:cid
	En esta vista se puede acceder al detalle de cualquier carrito que quiera consultar 

### Testing ( Coleccion Postman para realizar los testing a todos los EndPoint )
- En la carpeta src/test/postman/E-commerce Backend Server.postman_collection.js
- Podes importar la coleccion en POSTMAN y realizar los TEST a los endPoint



###End