import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    tag: {
        type: String,
        require: true
    }
    }
},{timestamps: true});

export const Category = mongoose.model("category", categorySchema)