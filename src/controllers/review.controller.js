import { reviewService } from "../services/index.js";
import { logger } from "../utils/index.js";

export const getAllReviewsController = async (req, res, next) => {
    try {
        const reviews = await reviewService.getAll();
        return res.status(200).send({
            message: "success",
            data: reviews,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getReviewByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const review = await reviewService.getById(id);
        return res.status(200).send({
            message: "success",
            data: review,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const createReviewController = async (req, res, next) => {
    try {
        const body = req.body;
        const newReview = await reviewService.create(body);
        return res.status(201).send({
            message: "created",
            data: newReview.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const updateReviewController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedReview = await reviewService.update(id, body);

        if (!updatedReview) {
            return res.status(404).send({
                message: "review not found",
            });
        }

        return res.status(200).send({
            message: "updated",
            data: updatedReview.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const deleteReviewController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedReview = await reviewService.delete(id);

        if (!deletedReview) {
            return res.status(404).send({
                message: "review not found",
            });
        }

        return res.status(200).send({
            message: "deleted",
            data: deletedReview.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
