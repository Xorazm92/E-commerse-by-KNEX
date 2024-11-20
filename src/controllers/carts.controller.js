import { cartService } from "../services/index.js";
import { logger } from "../utils/index.js";

export const getAllCartsController = async (req, res, next) => {
    try {
        const carts = await cartService.getAll();
        return res.status(200).send({
            message: "success",
            data: carts,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getCartByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cart = await cartService.getById(id);
        return res.status(200).send({
            message: "success",
            data: cart,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const createCartController = async (req, res, next) => {
    try {
        const body = req.body;
        const newCart = await cartService.create(body);
        return res.status(201).send({
            message: "created",
            data: newCart,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const updateCartController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedCart = await cartService.updateById(id, body);

        if (!updatedCart) {
            return res.status(404).send({
                message: "Cart not found",
            });
        }

        return res.status(200).send({
            message: "updated",
            data: updatedCart,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const deleteCartController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedCart = await cartService.deleteById(id);

        if (!deletedCart) {
            return res.status(404).send({
                message: "Cart not found",
            });
        }

        return res.status(200).send({
            message: "deleted",
            data: deletedCart,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
