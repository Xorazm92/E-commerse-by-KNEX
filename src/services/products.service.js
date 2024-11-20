import { Product } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const getProductService = async (type, data = "") => {
    try {
        let result;

        switch (type) {
            case "all":
                result = await Product.find();
                break;

            case "filter":
                result = await Product.find(data);
                break;

            case "id":
                result = await Product.findById(data);
                if (!result) {
                    throw new AppError("Product not found", 404);
                }
                break;

            case "category":
                result = await Product.find({ category_id: data });
                if (result.length === 0) {
                    throw new AppError("No products found for this category", 404);
                }
                break;

            case "title":
                result = await Product.find({ title: { $regex: data, $options: "i" } }); 
                if (result.length === 0) {
                    throw new AppError("Product with this title not found", 404);
                }
                break;

            case "price":
                result = await Product.find({ price: data });
                if (result.length === 0) {
                    throw new AppError("No products found for this price", 404);
                }
                break;

            default:
                throw new AppError("Invalid type for product retrieval", 400);
        }

        return result;
    } catch (error) {
        throw error instanceof AppError ? error : new AppError(error.message, 500);
    }
};



export const createProductService = async (productData) => {
    try {
        const newProduct = await Product.create(productData); 
        return newProduct;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
};

export const updateProductService = async (id, productData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
            new: true, 
            runValidators: true, 
        });

        if (!updatedProduct) {
            throw new AppError("Product not found or failed to update", 404);
        }

        return updatedProduct;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
};

export const deleteProductService = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new AppError("Product not found or failed to delete", 404);
        }

        return deletedProduct;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
};
