import { db } from "../database/index.js";
import { SocialProfile } from "../schemas/index.js";
import { AppError } from "../utils/index.js";

export const socialProfileService = {
    getAll: async () => {
        try {
            const profiles = await db.select().from("social_profiles");
            return profiles;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    getById: async (id) => {
        try {
            const profile = await db.select("*").from("social_profiles").where("id", "=", id);
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
            const newProfile = await db('social_profiles').insert(profileData)
            return newProfile;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },

    update: async (id, updateData) => {
        try {
            const updatedProfile = await db("social_profiles").where({id}).update(updateData)
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
            const deletedProfile =  db("social_profiles").where({id}).del()
            if (!deletedProfile) {
                throw new AppError("Social profile not found", 404);
            }

            return deletedProfile;
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    },
};
