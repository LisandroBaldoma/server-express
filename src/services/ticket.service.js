import { Cart } from "../dao/Models/Cart.js";
import { Ticket } from "../dao/Models/Ticket.js";
import { cartManager } from "../dao/mongoodb/cart.manager.js";
import { ticketManager } from "../dao/mongoodb/ticket.manager.js";
import { cartRpository } from "../repositories/cart.repository.js";
import { productsRepository } from "../repositories/product.respository.js";
import { userRepository } from "../repositories/user.repository.js";
import { productService } from "./products.service.js";

class TicketService {
  async purchase(cid, purchase) {
    const cart = await cartRpository.getCartById(cid);
    const user = await userRepository.findOne({ cart: cid });

    const productConStock = [];
    const productSinStock = [];
    let amount = 0;
    cart.products.forEach(async (element, key) => {
      // Si tiene stock lo guardo
      if (element.product.stock >= element.quantity) {
        let subamount = element.product.price * element.quantity;
        amount = amount + subamount;
        productConStock.push(element);

        //await cartManager.deleteProductCart(cid,element.product._id)
      } else {
        productSinStock.push(element);
      }
    });

    let datosTicket = { amount: amount, purchaser: user.email };
    const ticket = new Ticket(datosTicket);
    //  console.log(productSinStock)
     console.log(ticket.dtoTicket())
    const ticketFinal = await ticketManager.create(ticket.dtoTicket())
    console.log(productConStock.length);
    //console.log(ticketFinal);

    if (productConStock.length > 0) {
      console.log("eliminar estos productos cons stock");
      productConStock.forEach(async (element) => {
        //console.log(element._id)
        const result = await productService.descotarStock(element.product._id, element.quantity)
        // const eliminar = await cartManager.deleteProductCart(
        //   cid,
        //   element.product._id
        // );
        //console.log(eliminar)
      });
    }

    
  }
}

export const ticketService = new TicketService();
