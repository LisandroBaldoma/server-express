//import { TIPO_PERSISTENCIA } from '../config/persistencia.config.js'
import { conectarMongooseDb } from '../database/mongoose.js';
import dotenv from 'dotenv'

dotenv.config({
  path:  
    process.argv.slice(2)[0] === 'memoria' ? 'memoria.env' : 'mongodb.env' 
})

let cartDao
let productsDao
let usersDao

if (process.env.TIPO_PERSISTENCIA === 'mongodb') {
  console.log(`Persistencia de Datos en: ${process.env.TIPO_PERSISTENCIA} `)
  await conectarMongooseDb();
  const { cartManager } = await import('./mongoodb/cart.manager.js')
  const { productsManager } = await import('./mongoodb/product.manager.js')
  const { userManager } = await import('./mongoodb/user.manager.js')
  cartDao = cartManager
  productsDao = productsManager
  usersDao = userManager
} else {
  console.log(`Persistencia de Datos en: ${process.env.TIPO_PERSISTENCIA} `)
  const { productsManagerFS } = await import('./fileSystem/ProductManagerFS.js')
  const { carttsMnagerFS } = await import('./fileSystem/CartManagerFS.js')
  const { userMangerFS } = await import('./fileSystem/UserManagerFS.js')
  cartDao = carttsMnagerFS
  productsDao = productsManagerFS
  usersDao = userMangerFS
  console.log("Estamos trabajando en memoria, las operacion seran restringidas")
  
}

export { cartDao, productsDao, usersDao }