import { Router } from 'express'
import { createCartController, deleteCartController, getAllCartsController, getCartByIdController, updateCartController } from '../controllers/index.js'

export const cartsRouter = Router()

cartsRouter.get('/', getAllCartsController)
cartsRouter.get('/:id',  getCartByIdController)
cartsRouter.post('/',  createCartController)
cartsRouter.put('/:id',  updateCartController)
cartsRouter.delete('/:id',  deleteCartController)