import { socialProfileService } from "../services/index.js";
import { logger } from "../utils/index.js";

export const getAllSocialProfilesController = async (req, res, next) => {
    try {
        const profiles = await socialProfileService.getAll();
        return res.status(200).send({
            message: "success",
            data: profiles,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getSocialProfileByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const profile = await socialProfileService.getById(id);
        return res.status(200).send({
            message: "success",
            data: profile,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const createSocialProfileController = async (req, res, next) => {
    try {
        const body = req.body;
        const newProfile = await socialProfileService.create(body);
        return res.status(201).send({
            message: "created",
            data: newProfile.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const updateSocialProfileController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedProfile = await socialProfileService.update(id, body);

        if (!updatedProfile) {
            return res.status(404).send({
                message: "social profile not found",
            });
        }

        return res.status(200).send({
            message: "updated",
            data: updatedProfile.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const deleteSocialProfileController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProfile = await socialProfileService.delete(id);

        if (!deletedProfile) {
            return res.status(404).send({
                message: "social profile not found",
            });
        }

        return res.status(200).send({
            message: "deleted",
            data: deletedProfile.id,
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
