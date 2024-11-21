import express from "express";
import {
    getAllCartItemsController,
    getCartItemByIdController,
    createCartItemController,
    updateCartItemController,
    deleteCartItemController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middlewares/index.js";

export const cartItemRouter = express.Router();

cartItemRouter.get("/",  getAllCartItemsController);
cartItemRouter.get("/:id",  getCartItemByIdController);
cartItemRouter.post("/",  createCartItemController);
cartItemRouter.put("/:id", updateCartItemController);
cartItemRouter.delete("/:id", deleteCartItemController);
