import express from "express";
import {
    getAllReviewsController,
    getReviewByIdController,
    createReviewController,
    updateReviewController,
    deleteReviewController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middlewares/index.js";

export const reviewRouter = express.Router();

reviewRouter.get("/", authGuard("access"), getAllReviewsController);
reviewRouter.get("/:id", authGuard("access"), getReviewByIdController);
reviewRouter.post("/", authGuard("access"), createReviewController);
reviewRouter.put("/:id", authGuard("access"), roleGuard(["admin", "user"]), updateReviewController);
reviewRouter.delete("/:id", authGuard("access"), roleGuard(["admin"]), deleteReviewController);
