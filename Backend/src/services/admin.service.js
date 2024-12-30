const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { NotFoundError, UnauthorizedError } = require('../utils/errors');

class AdminService {
  async getDashboardStats() {
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      recentOrders,
      lowStockProducts,
      salesStats
    ] = await Promise.all([
      // Get total users count
      User.query().count().first(),
      
      // Get total orders count
      Order.query().count().first(),
      
      // Get total products count
      Product.query().count().first(),
      
      // Get recent orders
      Order.query()
        .withGraphFetched('[user, orderItems.product]')
        .orderBy('created_at', 'desc')
        .limit(5),
      
      // Get low stock products (less than 10 items)
      Product.query()
        .where('quantity', '<', 10)
        .withGraphFetched('category')
        .orderBy('quantity')
        .limit(10),
      
      // Get sales statistics
      Order.query()
        .select(
          Order.raw('DATE(created_at) as date'),
          Order.raw('COUNT(*) as order_count'),
          Order.raw('SUM(total_amount) as total_sales')
        )
        .where('status', 'completed')
        .groupBy('date')
        .orderBy('date', 'desc')
        .limit(30)
    ]);

    return {
      totalUsers: parseInt(totalUsers.count),
      totalOrders: parseInt(totalOrders.count),
      totalProducts: parseInt(totalProducts.count),
      recentOrders,
      lowStockProducts,
      salesStats
    };
  }

  async getUserStats() {
    return await User.query()
      .select(
        User.raw('DATE(created_at) as date'),
        User.raw('COUNT(*) as user_count')
      )
      .groupBy('date')
      .orderBy('date', 'desc')
      .limit(30);
  }

  async getOrderStats() {
    return await Order.query()
      .select(
        'status',
        Order.raw('COUNT(*) as order_count'),
        Order.raw('SUM(total_amount) as total_amount')
      )
      .groupBy('status');
  }

  async getProductStats() {
    return await Product.query()
      .select(
        'products.id',
        'products.name',
        'products.quantity',
        Product.raw('COUNT(DISTINCT order_items.order_id) as order_count'),
        Product.raw('SUM(order_items.quantity) as total_sold')
      )
      .leftJoin('order_items', 'products.id', 'order_items.product_id')
      .groupBy('products.id', 'products.name', 'products.quantity')
      .orderBy('total_sold', 'desc')
      .limit(20);
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.query()
      .patchAndFetchById(orderId, { status })
      .withGraphFetched('[user, orderItems.product]');
    
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    
    return order;
  }

  async manageUserRole(userId, role) {
    if (!['user', 'admin'].includes(role)) {
      throw new Error('Invalid role');
    }

    const user = await User.query()
      .patchAndFetchById(userId, { role });
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  async getSystemLogs(query = {}) {
    const { page = 1, limit = 50, level, startDate, endDate } = query;
    
    // This is a placeholder. Implement actual log retrieval based on your logging system
    // For example, if using Winston with MongoDB storage:
    /*
    return await LogModel.query()
      .where('timestamp')
      .between(startDate, endDate)
      .andWhere('level', level)
      .orderBy('timestamp', 'desc')
      .page(page - 1, limit);
    */
    
    return {
      message: 'Log retrieval needs to be implemented based on your logging system'
    };
  }

  async getInventoryAlerts() {
    return await Product.query()
      .where('quantity', '<', 10)
      .withGraphFetched('category')
      .orderBy('quantity');
  }

  async generateSalesReport(startDate, endDate) {
    return await Order.query()
      .select(
        Order.raw('DATE(created_at) as date'),
        Order.raw('COUNT(*) as order_count'),
        Order.raw('SUM(total_amount) as total_sales'),
        'status'
      )
      .whereBetween('created_at', [startDate, endDate])
      .groupBy('date', 'status')
      .orderBy('date');
  }
}

module.exports = new AdminService();
