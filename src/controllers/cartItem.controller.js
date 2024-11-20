import { cartItemService } from "../services/index.js";
import { logger } from "../utils/index.js";

export const getAllCartItemsController = async (req, res, next) => {
    try {
        const cartItems = await cartItemService.getAll();
        return res.status(200).send({
            message: "success",
            data: cartItems,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
export const getCartItemByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cartItem = await cartItemService.getById(id);
        return res.status(200).send({
            message: "success",
            data: cartItem,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
export const createCartItemController = async (req, res, next) => {
    try {
        const body = req.body;
        const newCartItem = await cartItemService.create(body);
        return res.status(201).send({
            message: "created",
            data: newCartItem.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const updateCartItemController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedCartItem = await cartItemService.update(id, body);

        if (!updatedCartItem) {
            return res.status(404).send({
                message: "cart item not found",
            });
        }

        return res.status(200).send({
            message: "updated",
            data: updatedCartItem.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const deleteCartItemController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedCartItem = await cartItemService.delete(id);

        if (!deletedCartItem) {
            return res.status(404).send({
                message: "cart item not found",
            });
        }

        return res.status(200).send({
            message: "deleted",
            data: deletedCartItem.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
