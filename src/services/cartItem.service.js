import { db } from "../database/index.js";
import { CartItem } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const cartItemService = {
    getAll: async () => {
        try {
            const cartItems = await db.select().from('cart_item')
            return cartItems;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    getById: async (id) => {
        try {
            const cartItem = db.select().from('cart_item').where("id", "=", id)
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
            const newCartItem = await db('cart_item').insert(cartItemData)
            return newCartItem;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    update: async (id, updateData) => {
        try {
            const updatedCartItem = await db('cart_item').where("id", "=", id).update(updateData);

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
            const deletedCartItem = await db('cart_item').where("id", "=", id).del()

            if (!deletedCartItem) {
                throw new AppError("Cart item not found", 404);
            }

            return deletedCartItem;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};
