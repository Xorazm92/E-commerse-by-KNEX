import { db } from "../database/index.js";
import { AppError } from "../utils/index.js";

export const wishlistService = {
    getAll: async () => {
        try {
            const wishlists = await db("wishlist")
                .select(
                    "wishlists.*",
                    "users.name as user_name",
                    "products.name as product_name"
                )
                .leftJoin("users", "wishlists.user_id", "users.id")
                .leftJoin("products", "wishlists.product_id", "products.id");

            return wishlists.map((wishlist) => ({
                id: wishlist.id,
                user_id: wishlist.user_id,
                product_id: wishlist.product_id,
                created_at: wishlist.created_at,
                updated_at: wishlist.updated_at,
                user: {
                    id: wishlist.user_id,
                    name: wishlist.user_name,
                },
                product: {
                    id: wishlist.product_id,
                    name: wishlist.product_name,
                },
            }));
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
    getById: async (id) => {
        try {
            const wishlist = await db("wishlist")
                .select(
                    "wishlists.*",
                    "users.name as user_name",
                    "products.title as product_title"
                )
                .leftJoin("users", "wishlists.user_id", "users.id")
                .leftJoin("products", "wishlists.product_id", "products.id")
                .where("wishlists.id", id)
                .first();

            if (!wishlist) {
                throw new AppError("Wishlist not found", 404);
            }

            return {
                id: wishlist.id,
                user_id: wishlist.user_id,
                product_id: wishlist.product_id,
                created_at: wishlist.created_at,
                updated_at: wishlist.updated_at,
                user: {
                    id: wishlist.user_id,
                    name: wishlist.user_name,
                },
                product: {
                    id: wishlist.product_id,
                    title: wishlist.product_title,
                },
            };
        } catch (error) {
            throw error instanceof AppError
                ? error
                : new AppError(error.message, 500);
        }
    },
    create: async (wishlistData) => {
        try {
            const newWishlist = await db("wishlist")
                .insert(wishlistData)
                .returning("*");

            return newWishlist[0];
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
    update: async (id, updateData) => {
        try {
            const updatedWishlist = await db("wishlist")
                .where({ id })
                .update(updateData)
                .returning("*");

            if (updatedWishlist.length === 0) {
                throw new AppError("Wishlist not found", 404);
            }

            return updatedWishlist[0];
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
    delete: async (id) => {
        try {
            const deletedWishlist = await db("wishlist")
                .where({ id })
                .del()
                .returning("*");

            if (deletedWishlist.length === 0) {
                throw new AppError("Wishlist not found", 404);
            }

            return deletedWishlist[0];
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};

