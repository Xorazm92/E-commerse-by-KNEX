import mongoose from "mongoose";



const ordersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true,
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts',
        required: true,
    },
},{timestamps: true});

export const Orders = mongoose.model("Order", ordersSchema);
