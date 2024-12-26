import db from '../database/index.js';
import { AppError } from '../utils/index.js';
import { logger } from '../utils/index.js';

export const cartService = {
    // Get user's cart
    getUserCart: async (userId) => {
        try {
            const cartItems = await db('cart')
                .select(
                    'cart.id',
                    'cart.quantity',
                    'products.id as product_id',
                    'products.title',
                    'products.price',
                    'products.image_url'
                )
                .join('products', 'cart.product_id', 'products.id')
                .where('cart.user_id', userId);

            return cartItems;
        } catch (error) {
            logger.error('Get user cart error:', error);
            throw new AppError('Error fetching cart items', 500);
        }
    },

    // Add item to cart
    addToCart: async (userId, productId, quantity = 1) => {
        try {
            // Check if product exists
            const product = await db('products')
                .where('id', productId)
                .first();

            if (!product) {
                throw new AppError('Product not found', 404);
            }

            // Check if item already in cart
            const existingItem = await db('cart')
                .where({
                    user_id: userId,
                    product_id: productId
                })
                .first();

            if (existingItem) {
                // Update quantity if item exists
                const [updatedItem] = await db('cart')
                    .where('id', existingItem.id)
                    .update({
                        quantity: existingItem.quantity + quantity
                    })
                    .returning('*');

                return updatedItem;
            } else {
                // Add new item if it doesn't exist
                const [newItem] = await db('cart')
                    .insert({
                        user_id: userId,
                        product_id: productId,
                        quantity: quantity
                    })
                    .returning('*');

                return newItem;
            }
        } catch (error) {
            logger.error('Add to cart error:', error);
            throw new AppError('Error adding item to cart', 500);
        }
    },

    // Update cart item quantity
    updateCartItem: async (userId, cartItemId, quantity) => {
        try {
            const [updatedItem] = await db('cart')
                .where({
                    id: cartItemId,
                    user_id: userId
                })
                .update({ quantity })
                .returning('*');

            if (!updatedItem) {
                throw new AppError('Cart item not found', 404);
            }

            return updatedItem;
        } catch (error) {
            logger.error('Update cart item error:', error);
            throw new AppError('Error updating cart item', 500);
        }
    },

    // Remove item from cart
    removeFromCart: async (userId, cartItemId) => {
        try {
            const deletedCount = await db('cart')
                .where({
                    id: cartItemId,
                    user_id: userId
                })
                .del();

            if (deletedCount === 0) {
                throw new AppError('Cart item not found', 404);
            }

            return true;
        } catch (error) {
            logger.error('Remove from cart error:', error);
            throw new AppError('Error removing item from cart', 500);
        }
    },

    // Clear cart
    clearCart: async (userId) => {
        try {
            await db('cart')
                .where('user_id', userId)
                .del();

            return true;
        } catch (error) {
            logger.error('Clear cart error:', error);
            throw new AppError('Error clearing cart', 500);
        }
    },

    // Get cart total
    getCartTotal: async (userId) => {
        try {
            const result = await db('cart')
                .join('products', 'cart.product_id', 'products.id')
                .where('cart.user_id', userId)
                .sum('products.price * cart.quantity as total')
                .first();

            return result.total || 0;
        } catch (error) {
            logger.error('Get cart total error:', error);
            throw new AppError('Error calculating cart total', 500);
        }
    }
};
