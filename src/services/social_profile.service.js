import { SocialProfile } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const socialProfileService = {
    getAll: async () => {
        try {
            const profiles = await SocialProfile.find().populate("user_id");
            return profiles;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    getById: async (id) => {
        try {
            const profile = await SocialProfile.findById(id).populate("user_id");

            if (!profile) {
                throw new AppError("Social profile not found", 404);
            }

            return profile;
        } catch (error) {
            throw error instanceof AppError ? error : new AppError(error.message, 500);
        }
    },

    create: async (profileData) => {
        try {
            const newProfile = await SocialProfile.create(profileData);
            return newProfile;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    update: async (id, updateData) => {
        try {
            const updatedProfile = await SocialProfile.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });

            if (!updatedProfile) {
                throw new AppError("Social profile not found", 404);
            }

            return updatedProfile;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    delete: async (id) => {
        try {
            const deletedProfile = await SocialProfile.findByIdAndDelete(id);

            if (!deletedProfile) {
                throw new AppError("Social profile not found", 404);
            }

            return deletedProfile;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};
