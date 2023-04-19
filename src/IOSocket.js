import { ProductManager } from "./dao/fileSystem/ProductManager.js";

export default async (io) => {
  const pm = new ProductManager("./database/products.json");

  io.on("connection", async (clientSocket) => {
    console.log(`Nuevo cliente conectado! socket id # ${clientSocket.id}`);
    clientSocket.emit("productList", await pm.getProducts());
    clientSocket.on("createNewProduct", async (newProduct) => {
      try {
        const product = await pm.createProduct({ ...newProduct });
        clientSocket.emit("addProductSucces", {
          mensaje: "producto creado con exito",
        });
        clientSocket.emit("productList", await pm.getProducts());
      } catch (error) {
        clientSocket.emit("error", { mensaje: error.message });
      }
    });
    clientSocket.on("deleteProduct", async (idProduct) => {
      try {
        await pm.deletedProduct(idProduct);
        clientSocket.emit("deleteProductSucces", {
          mensaje: "producto Eliminado con exito",
        });
      } catch (error) {
        clientSocket.emit("error", { mensaje: error.message });
      }
    });
  });  
};
