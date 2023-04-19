import { IDNOTFOUND } from "../../error/codError.js";
import cartModel from "../Models/cart.Mongoose.js";
import productModel from "../Models/Product.mongoose.js";

class CartManager {
  async createCart(cart) {
    const newCart = await cartModel.create(cart);
    return newCart;
  }
  async getCartById(cid) {
    // POPULATION
    const cart = await cartModel.findById(cid).populate('products.product');
    if (!cart) {
      throw new Error(IDNOTFOUND);
    }
    return cart;
  }

  async addProductCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    const prod = await productModel.findById(pid);

    const index = cart.products.findIndex(
      (product) => product.product == prod.id
    );

    if (index !== -1) {
      cart.products[index].quantity = cart.products[index].quantity + 1;
      cart.save();
      return cart.products[index]
    } else {
      cart.products.push({ product: prod.id, quantity: 1 });
      cart.save();
      return cart.products      
    }
  }

  async deleteAllProductCart(cid) {
    const cart = await cartModel.findById(cid);    
    cart.products = [];
    cart.save();
    return cart;
    
  }
  async deleteProductCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    const prod = await productModel.findById(pid);

    const index = cart.products.findIndex(
      (product) => product.product == prod.id
    );
    if (index !== -1) {      
      cart.products.splice(index, 1);
      cart.save();
      return cart;      
    } else {
      throw new Error("El producto no existe en el carrito");
    }
  }

  async updateProductsCart(body, cid) {
    const cart = await cartModel.findByIdAndUpdate(cid, body);
    doc.products = body;
    doc.save();

    console.log(doc.products.isMongooseArray);
    console.log(doc.products.isMongooseDocumentArray);
    console.log(doc);
    console.log(body);
  }

  async updateProductsCart(pid, cid, body) {
    console.log(pid);
    console.log(cid);
    console.log(body);
  }
}
export const cartManager = new CartManager();

// TODO METODOS Y RUTAS AGREGAR

// DELETE (DEBE ELIMINIAR EL CARRITO SELECCIONADO) RUTA: api/carts/:cid/products/:pid "deleteProductCart"

// PUT UPDATE TODO EL CARRITO RECIBIENDO COMO BODY LOS PRODUCTOS A AACTUALIZAR
// ESTE METODO RECIBE EN EL BODY UN ARRAY CON TODOS LOS PROCUTOS QUE QUEREMOS ACTUALIZAR
// RUTA: api/carts/:cid

//PUT UPDATE SOLO LA CANTIDAD DE PRODUCTOS QUE PASO POR REQ.BODY RUTA: api/carts/:cid/prodcuts/:pid

// DELETE ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO RUTA: api/carts/:cid "deleteAllProductCart"
