import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pm = new ProductManager("./database/products.json");

// devolver todos los productos
app.get("/products", async (req, res) => {
  if (req.query.limit) {
    try {
    const { limit } = req.query;
    const personas = await pm.getProducts();    
    res.json(personas.slice(0, limit));
    } catch (error) {
      res.status(404).json({mensaje: error.message})
    }    
  } else {
    try {
      const products = await pm.getProducts();
      res.json(products);
    } catch (error) {
      res.json({ mensaje: error.message });
    }
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    const product = await pm.getProductByID(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.post("/products", async (req, res) => {
  try {
    const newProduct = await pm.createProduct({ ...req.body });
    res.json(newProduct);
  } catch (error) {
    res.status(404).json({mensaje: error.message});
  }
});
app.put("/products/:id", async (req, res) => {
  try {
    const updateProduct = await pm.updateProduct(req.params.id, {
      ...req.body,
    });
    res.json(updateProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    await pm.deletedProduct(req.params.id);
    res.send(204);
  } catch (error) {
    res.status(404).json({ messaage: error.message });
  }
});

const server = app.listen(8080);
