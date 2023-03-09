import express, { Router } from 'express'
import { CartManager } from "../CartManager.js"

export const cartRouter = Router()

const cm = new CartManager("./database/cart.json", "./database/products.json" )

cartRouter.post("/", async(req,res) => {
    const newCart = await cm.createCart()    
    res.send({status:"succes", payload:newCart})
  })
cartRouter.post("/:cid/product/:pid", async(req,res) => {
    try {
      const products = await cm.addProductCart(req.params.cid, req.params.pid)
      res.send({status:"succes", payload:products})
    } catch (error) {
      res.status(400).json({status:"error", message: error.message})
    }
    
  })
cartRouter.get("/:id", async(req,res) => {
  try {
    const cart = await cm.getCartById(req.params.id)
    res.send(cart)
  } catch (error) {
    res.status(404).json({message:error.message})
  }    
  }) 