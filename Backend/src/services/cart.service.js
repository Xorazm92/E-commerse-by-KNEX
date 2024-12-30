const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { NotFoundError } = require('../utils/errors');
const { transaction } = require('objection');

class CartService {
  async getOrCreateCart(userId) {
    let cart = await Cart.query()
      .findOne({ user_id: userId })
      .withGraphFetched('cartItems.product');
    
    if (!cart) {
      cart = await Cart.query().insert({ user_id: userId });
    }
    
    return cart;
  }

  async addToCart(userId, productId, quantity) {
    return await transaction(Cart.knex(), async (trx) => {
      const cart = await this.getOrCreateCart(userId);
      
      // Check if product exists and has enough stock
      const product = await Product.query(trx).findById(productId);
      if (!product) {
        throw new NotFoundError('Product not found');
      }
      
      if (product.quantity < quantity) {
        throw new Error('Not enough stock');
      }

      // Check if item already exists in cart
      let cartItem = await CartItem.query(trx)
        .findOne({
          cart_id: cart.id,
          product_id: productId
        });

      if (cartItem) {
        // Update quantity if item exists
        cartItem = await CartItem.query(trx)
          .patchAndFetchById(cartItem.id, {
            quantity: cartItem.quantity + quantity
          })
          .withGraphFetched('product');
      } else {
        // Create new cart item
        cartItem = await CartItem.query(trx)
          .insert({
            cart_id: cart.id,
            product_id: productId,
            quantity
          })
          .withGraphFetched('product');
      }

      return cartItem;
    });
  }

  async updateCartItemQuantity(userId, cartItemId, quantity) {
    const cart = await this.getOrCreateCart(userId);
    
    const cartItem = await CartItem.query()
      .findById(cartItemId)
      .withGraphFetched('product');
    
    if (!cartItem || cartItem.cart_id !== cart.id) {
      throw new NotFoundError('Cart item not found');
    }

    // Check product stock
    if (cartItem.product.quantity < quantity) {
      throw new Error('Not enough stock');
    }

    return await CartItem.query()
      .patchAndFetchById(cartItemId, { quantity })
      .withGraphFetched('product');
  }

  async removeFromCart(userId, cartItemId) {
    const cart = await this.getOrCreateCart(userId);
    
    const deleted = await CartItem.query()
      .delete()
      .where({
        id: cartItemId,
        cart_id: cart.id
      });
    
    if (!deleted) {
      throw new NotFoundError('Cart item not found');
    }
    
    return { success: true };
  }

  async getCartItems(userId) {
    const cart = await this.getOrCreateCart(userId);
    
    return await CartItem.query()
      .where('cart_id', cart.id)
      .withGraphFetched('product');
  }

  async clearCart(userId) {
    const cart = await this.getOrCreateCart(userId);
    
    await CartItem.query()
      .delete()
      .where('cart_id', cart.id);
    
    return { success: true };
  }

  async getCartTotal(userId) {
    const cartItems = await this.getCartItems(userId);
    
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
}

module.exports = new CartService();
