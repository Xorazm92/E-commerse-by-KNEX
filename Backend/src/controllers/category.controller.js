import {
    createCategoryService,
    deleteCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
} from '../services/index.js'

export const getAllCategoriesController = async (req, res, next) => {
    try {
        const categories = await getAllCategoriesService(req.query);
        return res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

export const getCategoryByIdController = async (req, res, next) => {
    try {
        const category = await getCategoryByIdService(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Category retrieved successfully',
            data: category
        });
    } catch (error) {
        next(error);
    }
};

export const createCategoryController = async (req, res, next) => {
    try {
        const category = await createCategoryService(req.body);
        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        next(error);
    }
};

export const updateCategoryController = async (req, res, next) => {
    try {
        const category = await updateCategoryService(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: category
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCategoryController = async (req, res, next) => {
    try {
        await deleteCategoryService(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
