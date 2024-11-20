import express from "express";
import {
    getAllSocialProfilesController,
    getSocialProfileByIdController,
    createSocialProfileController,
    updateSocialProfileController,
    deleteSocialProfileController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middlewares/index.js";

export const socialProfileRouter = express.Router();

socialProfileRouter.get("/", authGuard("access"), getAllSocialProfilesController);
socialProfileRouter.get("/:id", authGuard("access"), getSocialProfileByIdController);
socialProfileRouter.post("/", authGuard("access"), createSocialProfileController);
socialProfileRouter.put("/:id", authGuard("access"), roleGuard(["admin", "user"]), updateSocialProfileController);
socialProfileRouter.delete("/:id", authGuard("access"), roleGuard(["admin"]), deleteSocialProfileController);
