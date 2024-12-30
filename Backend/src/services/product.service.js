const Product = require('../models/Product');
const { NotFoundError } = require('../utils/errors');

class ProductService {
  async createProduct(productData) {
    return await Product.query().insert(productData);
  }

  async getAllProducts(query = {}) {
    const { page = 1, limit = 10, category_id, search, sort_by, order = 'asc' } = query;
    
    let productsQuery = Product.query()
      .withGraphFetched('category')
      .page(page - 1, limit);

    if (category_id) {
      productsQuery = productsQuery.where('category_id', category_id);
    }

    if (search) {
      productsQuery = productsQuery.where(builder => {
        builder.where('name', 'ilike', `%${search}%`)
          .orWhere('description', 'ilike', `%${search}%`);
      });
    }

    if (sort_by) {
      productsQuery = productsQuery.orderBy(sort_by, order);
    }

    return await productsQuery;
  }

  async getProductById(id) {
    const product = await Product.query()
      .findById(id)
      .withGraphFetched('category');
    
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    
    return product;
  }

  async updateProduct(id, updateData) {
    const product = await Product.query()
      .patchAndFetchById(id, updateData);
    
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    
    return product;
  }

  async deleteProduct(id) {
    const deleted = await Product.query().deleteById(id);
    
    if (!deleted) {
      throw new NotFoundError('Product not found');
    }
    
    return { success: true };
  }

  async updateProductQuantity(id, quantity, operation = 'decrease') {
    const product = await this.getProductById(id);
    
    if (operation === 'decrease') {
      if (product.quantity < quantity) {
        throw new Error('Insufficient stock');
      }
      product.quantity -= quantity;
    } else {
      product.quantity += quantity;
    }

    return await Product.query().patchAndFetchById(id, {
      quantity: product.quantity
    });
  }

  async checkProductAvailability(id, requestedQuantity) {
    const product = await this.getProductById(id);
    return product.quantity >= requestedQuantity;
  }
}

module.exports = new ProductService();
