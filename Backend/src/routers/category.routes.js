import { Router } from 'express'
import {
    createCategoryController,
    deleteCategoryController,
    getallCategoryController,
    getoneCategoryController,
    updateCategoryController,
} from '../controllers/category.controller.js'
import { authGuard, checkValidatons, roleGuard } from '../middlewares/index.js'
import { categorySchema } from '../validations/index.js'
import { config } from '../configs/index.js'

export const categoryRouter = Router()

const secret = config.token.access.secret

categoryRouter.get('/', getallCategoryController)
categoryRouter.get('/:id', getoneCategoryController)
categoryRouter.post(
    '/',
    authGuard(secret),
    roleGuard(['superAdmin']),
    checkValidatons(categorySchema),
    createCategoryController,
)
categoryRouter.put(
    '/:id',
    authGuard(secret),
    roleGuard(['superAdmin']),
    updateCategoryController,
)
categoryRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(['superAdmin']),
    deleteCategoryController,
)
