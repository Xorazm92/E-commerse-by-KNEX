// models/CartItem.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    cart_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cart' },
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    quantity: { type: Number, required: true },
});

export const CartItem = mongoose.model('CartItem', cartItemSchema);


