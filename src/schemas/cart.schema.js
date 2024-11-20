import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true,
        },
        total: {
            type: Number, 
            required: true,
        },
    },
    { timestamps: true } 
);

export const Carts = mongoose.model("Carts", cartsSchema);
