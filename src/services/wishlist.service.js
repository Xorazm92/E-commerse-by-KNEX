import { Wishlist } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const wishlistService = {
    getAll: async () => {
        try {
            const wishlists = await Wishlist.find().populate("user_id").populate("product_id");
            return wishlists;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
    getById: async (id) => {
        try {
            const wishlist = await Wishlist.findById(id).populate("user_id").populate("product_id");
            if (!wishlist) {
                throw new AppError("Wishlist not found", 404);
            }
            return wishlist;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError(error.message, 500);
        }
    },
    create: async (wishlistData) => {
        try {
            const newWishlist = await Wishlist.create(wishlistData);
            return newWishlist;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
    update: async (id, updateData) => {
        try {
            const updatedWishlist = await Wishlist.findByIdAndUpdate(id, updateData, {
                new: true, 
                runValidators: true, 
            });
            if (!updatedWishlist) {
                throw new AppError("Wishlist not found", 404);
            }
            return updatedWishlist;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
    delete: async (id) => {
        try {
            const deletedWishlist = await Wishlist.findByIdAndDelete(id);
            if (!deletedWishlist) {
                throw new AppError("Wishlist not found", 404);
            }
            return deletedWishlist;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};
