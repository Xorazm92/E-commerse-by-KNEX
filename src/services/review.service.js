import { Review } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const reviewService = {
    getAll: async () => {
        try {
            const reviews = await Review.find().populate("user_id").populate("product_id");
            return reviews;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    getById: async (id) => {
        try {
            const review = await Review.findById(id).populate("user_id").populate("product_id");
            if (!review) {
                throw new AppError("Review not found", 404);
            }
            return review;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError(error.message, 500);
        }
    },

    create: async (reviewData) => {
        try {
            const newReview = await Review.create(reviewData);
            return newReview;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    update: async (id, updateData) => {
        try {
            const updatedReview = await Review.findByIdAndUpdate(id, updateData, {
                new: true, 
                runValidators: true, 
            });

            if (!updatedReview) {
                throw new AppError("Review not found", 404);
            }

            return updatedReview;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    delete: async (id) => {
        try {
            const deletedReview = await Review.findByIdAndDelete(id);

            if (!deletedReview) {
                throw new AppError("Review not found", 404);
            }

            return deletedReview;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};
