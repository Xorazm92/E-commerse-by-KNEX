import { wishlistService } from "../services/index.js";
import { logger } from "../utils/index.js";

export const getAllWishlistsController = async (req, res, next) => {
    try {
        const wishlists = await wishlistService.getAll();
        return res.status(200).json({
            message: "success",
            data: wishlists,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getWishlistByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const wishlist = await wishlistService.getById(id);
        return res.status(200).json({
            message: "success",
            data: wishlist,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const createWishlistController = async (req, res, next) => {
    try {
        const body = req.body;
        const newWishlist = await wishlistService.create(body);
        return res.status(201).json({
            message: "created",
            data: newWishlist,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const updateWishlistController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedWishlist = await wishlistService.update(id, body);

        if (!updatedWishlist) {
            return res.status(404).json({
                message: "wishlist not found",
            });
        }

        return res.status(200).json({
            message: "updated",
            data: updatedWishlist,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const deleteWishlistController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedWishlist = await wishlistService.delete(id);

        if (!deletedWishlist) {
            return res.status(404).json({
                message: "wishlist not found",
            });
        }

        return res.status(200).json({
            message: "deleted",
            data: deletedWishlist,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
