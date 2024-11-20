import { CartItem } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const cartItemService = {
    getAll: async () => {
        try {
            const cartItems = await CartItem.find()
                .populate("cart_id")
                .populate("product_id");
            return cartItems;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    getById: async (id) => {
        try {
            const cartItem = await CartItem.findById(id)
                .populate("cart_id")
                .populate("product_id");

            if (!cartItem) {
                throw new AppError("Cart item not found", 404);
            }

            return cartItem;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError(error.message, 500);
        }
    },

    create: async (cartItemData) => {
        try {
            const newCartItem = await CartItem.create(cartItemData);
            return newCartItem;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    update: async (id, updateData) => {
        try {
            const updatedCartItem = await CartItem.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });

            if (!updatedCartItem) {
                throw new AppError("Cart item not found", 404);
            }

            return updatedCartItem;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    delete: async (id) => {
        try {
            const deletedCartItem = await CartItem.findByIdAndDelete(id);

            if (!deletedCartItem) {
                throw new AppError("Cart item not found", 404);
            }

            return deletedCartItem;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};
