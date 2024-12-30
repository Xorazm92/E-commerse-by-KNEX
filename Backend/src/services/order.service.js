const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const productService = require('./product.service');
const cartService = require('./cart.service');
const { NotFoundError } = require('../utils/errors');
const { transaction } = require('objection');

class OrderService {
  async createOrder(userId, orderData) {
    return await transaction(Order.knex(), async (trx) => {
      // Get cart items
      const cartItems = await cartService.getCartItems(userId);
      if (!cartItems.length) {
        throw new Error('Cart is empty');
      }

      // Calculate total amount
      let totalAmount = 0;
      for (const item of cartItems) {
        const product = await productService.getProductById(item.product_id);
        totalAmount += product.price * item.quantity;

        // Check product availability
        if (!await productService.checkProductAvailability(item.product_id, item.quantity)) {
          throw new Error(`Product ${product.name} is out of stock`);
        }
      }

      // Create order
      const order = await Order.query(trx).insert({
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending',
        shipping_address: orderData.shipping_address,
        payment_method: orderData.payment_method
      });

      // Create order items and update product quantities
      for (const item of cartItems) {
        const product = await productService.getProductById(item.product_id);
        
        await OrderItem.query(trx).insert({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price
        });

        await productService.updateProductQuantity(item.product_id, item.quantity);
      }

      // Clear cart
      await cartService.clearCart(userId);

      return await Order.query(trx)
        .findById(order.id)
        .withGraphFetched('[orderItems.product]');
    });
  }

  async getUserOrders(userId, query = {}) {
    const { page = 1, limit = 10, status } = query;
    
    let ordersQuery = Order.query()
      .where('user_id', userId)
      .withGraphFetched('[orderItems.product]')
      .orderBy('created_at', 'desc')
      .page(page - 1, limit);

    if (status) {
      ordersQuery = ordersQuery.where('status', status);
    }

    return await ordersQuery;
  }

  async getOrderById(orderId, userId) {
    const order = await Order.query()
      .findById(orderId)
      .withGraphFetched('[orderItems.product]');
    
    if (!order || (userId && order.user_id !== userId)) {
      throw new NotFoundError('Order not found');
    }
    
    return order;
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.query()
      .patchAndFetchById(orderId, { status })
      .withGraphFetched('[orderItems.product]');
    
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    
    return order;
  }

  async getAllOrders(query = {}) {
    const { page = 1, limit = 10, status, sort_by = 'created_at', order = 'desc' } = query;
    
    let ordersQuery = Order.query()
      .withGraphFetched('[orderItems.product, user]')
      .orderBy(sort_by, order)
      .page(page - 1, limit);

    if (status) {
      ordersQuery = ordersQuery.where('status', status);
    }

    return await ordersQuery;
  }

  async getOrderStats() {
    const stats = await Order.query()
      .select(Order.raw('status, count(*), sum(total_amount) as total'))
      .groupBy('status');
    
    return stats;
  }
}

module.exports = new OrderService();
