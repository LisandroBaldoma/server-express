import express, { Router } from 'express'
import { ProductManager } from "../ProductManager.js"

export const productsRouter = Router()

const pm = new ProductManager('./database/products.json')

  productsRouter.get("/", async (req, res, next) => {
    if (req.query.limit) {
      try {
      const { limit } = req.query;
      const personas = await pm.getProducts();    
      res.json(personas.slice(0, limit));
      } catch (error) {
        next(error)
        //res.status(400).json({mensaje: error.message})
      }    
    } else {
      try {
        const products = await pm.getProducts();
        res.json(products);
      } catch (error) {
        next(error)
        //res.json({ mensaje: error.message });
      }
    }
  });
  productsRouter.get("/:id", async (req, res , next) => {
    try {
      const product = await pm.getProductByID(req.params.id);
      res.json(product);
    } catch (error) {
      next(error)
      //res.status(404).json({ message: error.message });
    }
  });
  productsRouter.post("/", async (req, res, next) => {
    try {
      const newProduct = await pm.createProduct({ ...req.body });
      res.json(newProduct);
    } catch (error) {
      next(error)
      //res.status(400).json({mensaje: error.message});
    }
  });
  productsRouter.put("/:id", async (req, res, next) => {
    try {
      const updateProduct = await pm.updateProduct(req.params.id, {
        ...req.body,
      });
      res.json(updateProduct);
    } catch (error) {
      next(error)
      //res.status(404).json({ message: error.message });
    }
  });
  productsRouter.delete("/:id", async (req, res, next) => {
    try {
      const deleteProduct = await pm.deletedProduct(req.params.id);
      res.json({status:"deleted", payload:deleteProduct});
    } catch (error) {
      next(error)
      //res.status(404).json({ messaage: error.message });
    }
  });