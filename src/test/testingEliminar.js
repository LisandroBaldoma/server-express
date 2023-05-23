import { conectarMongooseDb, desconectarMongoseDB } from "../database/mongoose.js";
import { productsManager } from "../dao/mongoodb/product.manager.js";
import { cartManager } from "../dao/mongoodb/cart.manager.js";
import { userManager } from "../dao/mongoodb/user.manager.js";


// Conectarme a la BD
await conectarMongooseDb();

// Limpiar Productos BD luego del TEST
await productsManager.deletedProductsTesting()
console.log("Se Eliminaron los Productos de testing con exito")

// Elimino Cart BD luego del TEST
 await cartManager.deletedCartTesting()
 console.log("Se Eliminaron los Cart de testing con exito")

 await userManager.deleteUserTesting()
 console.log("Se Eliminaron los Usuario de testing con exito")

// Me desconecto de la BD
await desconectarMongoseDB();