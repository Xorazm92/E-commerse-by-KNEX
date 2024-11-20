import mongoose from "mongoose";
import { Carts } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const cartService = {
    getAll: async () => {
        try {
            const data = await Carts.find().populate("user_id");
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
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new AppError("Invalid Cart ID", 400);
            }

            const data = await Carts.findById(id).populate("user_id");
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
            const newCart = new Carts(cartData);
            const data = await newCart.save();
            return data;
        } catch (error) {
            throw new AppError(error.message || "Failed to create cart", 500);
        }
    },

    updateById: async (id, updateData) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new AppError("Invalid Cart ID", 400);
            }

            const updatedCart = await Carts.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true } 
            );

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
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new AppError("Invalid Cart ID", 400);
            }

            const deletedCart = await Carts.findByIdAndDelete(id);
            if (!deletedCart) {
                throw new AppError("Cart not found or failed to delete", 404);
            }
            return deletedCart;
        } catch (error) {
            throw new AppError(error.message || "Failed to delete cart", 500);
        }
    },
};
