import express from 'express';
import {
    createProductController,
    deleteProductController,
    getAllProductsController,
    getProductByIdController,
    getFilteredProductsController,
    updateProductController,
} from '../controllers/index.js';
import { authGuard, roleGuard } from '../middlewares/index.js';

export const productsRouter = express.Router();

productsRouter.get('/', getAllProductsController);
productsRouter.get('/filter', getFilteredProductsController);
productsRouter.get('/:id', getProductByIdController);
productsRouter.post('/', authGuard("access"), roleGuard(["admin"]), createProductController);
productsRouter.put('/:id', authGuard("access"), roleGuard(["admin"]), updateProductController);
productsRouter.delete('/:id', authGuard("access"), roleGuard(["admin"]), deleteProductController);
