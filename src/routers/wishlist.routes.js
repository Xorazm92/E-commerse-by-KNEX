import express from "express";
import {
    getAllWishlistsController,
    getWishlistByIdController,
    createWishlistController,
    updateWishlistController,
    deleteWishlistController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middlewares/index.js";

export const wishlistRouter = express.Router();

wishlistRouter.get("/", authGuard("access"), getAllWishlistsController);
wishlistRouter.get("/:id", authGuard("access"), getWishlistByIdController);
wishlistRouter.post("/", authGuard("access"), createWishlistController);
wishlistRouter.put("/:id", authGuard("access"), roleGuard(["admin", "user"]), updateWishlistController);
wishlistRouter.delete("/:id", authGuard("access"), roleGuard(["admin"]), deleteWishlistController);
