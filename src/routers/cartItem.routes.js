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

cartItemRouter.get("/", authGuard("access"), getAllCartItemsController);
cartItemRouter.get("/:id", authGuard("access"), getCartItemByIdController);
cartItemRouter.post("/", authGuard("access"), createCartItemController);
cartItemRouter.put("/:id", authGuard("access"), roleGuard(["admin", "user"]), updateCartItemController);
cartItemRouter.delete("/:id", authGuard("access"), roleGuard(["admin"]), deleteCartItemController);
