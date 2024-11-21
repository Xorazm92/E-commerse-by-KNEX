import {
    getProductService,
    createProductService,
    updateProductService,
    deleteProductService,
} from "../services/index.js";
import { logger } from "../utils/index.js";

export const getAllProductsController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const pagination = { page: parseInt(page, 10) || 1, limit: parseInt(limit, 10) || 10 };
        const allProducts = await getProductService("all", "", pagination);
        return res.status(200).send({
            message: "success",
            data: allProducts,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getFilteredProductsController = async (req, res, next) => {
    try {
        const { category_id, name, price, tag, page, limit } = req.query;

        let filters = {};
        if (category_id) filters.category_id = category_id;
        if (name) filters.name = { $regex: name, $options: "i" };
        if (price) filters.price = price;
        if (tag) filters.tags = tag;

        const pagination = { page: parseInt(page, 10) || 1, limit: parseInt(limit, 10) || 10 };

        const filteredProducts = await getProductService("filter", filters, pagination);
        return res.status(200).send({
            message: "success",
            data: filteredProducts,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getProductByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await getProductService("id", id);
        return res.status(200).send({
            message: "success",
            data: product,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const createProductController = async (req, res, next) => {
    try {
        const body = req.body;
        const newProduct = await createProductService(body);
        return res.status(201).send({
            message: "created",
            data: newProduct.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const updateProductController = async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const updatedProduct = await updateProductService(id, body);

        if (!updatedProduct) {
            return res.status(404).send({
                message: "product not found",
            });
        }

        return res.status(200).send({
            message: "updated",
            data: updatedProduct.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const deleteProductController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProduct = await deleteProductService(id);

        if (!deletedProduct) {
            return res.status(404).send({
                message: "product not found",
            });
        }

        return res.status(200).send({
            message: "deleted",
            data: deletedProduct.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
