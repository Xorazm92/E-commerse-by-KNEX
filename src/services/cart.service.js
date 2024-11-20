import mongoose from "mongoose";
import { Carts } from "../schemas/index.js";
import { AppError } from "../utils/index.js";
import { db } from "../database/index.js";

export const cartService = {
    getAll: async () => {
        try {
            const data = await db.select().from("cart");
            if (!data.length) {
                throw new AppError("No carts found", 404);
            }
            return data;
        } catch (error) {
            throw new AppError(error.message || "Failed to fetch carts", 500);
        }
    },

    getById: async (id) => {
        try {
            // if (!mongoose.Types.ObjectId.isValid(id)) {
            //     throw new AppError("Invalid Cart ID", 400);
            // }

            const data = await db.select().from("cart").where("id", "=", id);
            if (!data) {
                throw new AppError("Cart not found", 404);
            }
            return data;
        } catch (error) {
            throw new AppError(error.message || "Failed to fetch cart by ID", 500);
        }
    },

    create: async (cartData) => {
        try {
            
            const newCart = await db("cart").insert(cartData);
            return newCart;
        } catch (error) {
            throw new AppError(error || "Failed to create cart", 500);
        }
    },

    updateById: async (id, updateData) => {
        try {
            // if (!mongoose.Types.ObjectId.isValid(id)) {
            //     throw new AppError("Invalid Cart ID", 400);
            // }

            const updatedCart = await db("cart").where("id", "=", id).update(updateData);
            if (!updatedCart) {
                throw new AppError("Cart not found or failed to update", 404);
            }
            return updatedCart;
        } catch (error) {
            throw new AppError(error.message || "Failed to update cart", 500);
        }
    },

    deleteById: async (id) => {
        try {
            // if (!mongoose.Types.ObjectId.isValid(id)) {
            //     throw new AppError("Invalid Cart ID", 400);
            // }

            const deletedCart = await db("cart").where("id", "=", id).del();
            if (!deletedCart) {
                throw new AppError("Cart not found or failed to delete", 404);
            }
            return deletedCart;
        } catch (error) {
            throw new AppError(error.message || "Failed to delete cart", 500);
        }
    },
};
