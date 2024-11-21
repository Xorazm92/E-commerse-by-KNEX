import { db } from "../database/index.js";
import { AppError } from "../utils/index.js";

export const reviewService = {
    getAll: async () => {
        try {
            const reviews = await db("reviews")
                .select("*")
                .leftJoin("users", "reviews.user_id", "users.id")
                .leftJoin("products", "reviews.product_id", "products.id");

            return reviews.map((review) => ({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                user: {
                    id: review.user_id,
                    name: review.user_name,
                },
                product: {
                    id: review.product_id,
                    name: review.product_name,
                },
            }));
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    getById: async (id) => {
        try {
            const review = await db("reviews")
                .select("*")
                .where("reviews.id", id)
                .leftJoin("users", "reviews.user_id", "users.id")
                .leftJoin("products", "reviews.product_id", "products.id")
                .first();

            if (!review) {
                throw new AppError("Review not found", 404);
            }

            return {
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                user: {
                    id: review.user_id,
                    name: review.user_name,
                },
                product: {
                    id: review.product_id,
                    name: review.product_name,
                },
            };
        } catch (error) {
            throw error instanceof AppError ? error : new AppError(error.message, 500);
        }
    },

    create: async (reviewData) => {
        try {
            const newReview = await db("reviews")
                .insert(reviewData)
                .returning("*");

            return newReview[0];
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    update: async (id, updateData) => {
        try {
            const updatedReview = await db("reviews")
                .where({ id })
                .update(updateData)
                .returning("*");

            if (updatedReview.length === 0) {
                throw new AppError("Review not found", 404);
            }

            return updatedReview[0];
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    delete: async (id) => {
        try {
            const deletedReview = await db("reviews")
                .where({ id })
                .del()
                .returning("*");

            if (deletedReview.length === 0) {
                throw new AppError("Review not found", 404);
            }

            return deletedReview[0];
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};
