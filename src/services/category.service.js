import { Category } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const getCategorySevice = async (type, data = "") => {
    try {
        switch (type) {
            case "all":
                const allCategory = await Category.find()
                return allCategory
            case "filter":
                const filter = await Category.find(data)
                return filter;
            case "id":
                const byId = await Category.findById(data)
                if(byId.length === 0){
                    throw new AppError('category not found', 404)
                }
                return byId
            case "name":
                const byName = await Category.find({name: data})
                if(byName.length === 0){
                    throw new AppError('category name not found', 404)
                }
                return byName
            case "tag":
                const tag = await Category.find({tag: data})
                if(tag.length === 0){
                    throw new AppError('category tag not found', 404)
                }
                return tag;
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const createCategoryService = async (category) => {
    try {
        const newCategories = await Category(category)
        await newCategories.save()
        return newCategories
    } catch (error) {
        throw new Error(error)
    }
}

export const updateCategoryService = async (category, id) => {
    try {
        const updateCategories = await Category.findByIdAndUpdate(id, category)
        if(!updateCategories.id){
            throw new AppError('will not update', 400)
        }
        return updateCategories
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteCategoryService = async (id) => {
    try {
        
        const updateCategories = await Category.findByIdAndDelete(id)
        return updateCategories
    } catch (error) {
        throw new Error(error)
    }
}