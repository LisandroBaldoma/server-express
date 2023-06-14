import express, { Router } from "express";
import { handleGetProducts } from "../../controllers/api/mockController.js";

export const mockRouter = Router();

mockRouter.get("/", handleGetProducts);
