import db from '../database/index.js'
import { AppError } from '../utils/index.js'
import Category from '../models/Category.js'
import { NotFoundError } from '../utils/errors.js'

class CategoryService {
  async createCategory(categoryData) {
    try {
      const newCategory = await db('categories')
        .insert(categoryData)
        .returning('*')

      return newCategory
    } catch (error) {
      throw new AppError(error.message, 500)
    }
  }

  async getAllCategories(query = {}) {
    try {
      const { page = 1, limit = 10, search } = query

      let categoriesQuery = db('categories')
        .select('*')
        .offset((page - 1) * limit)
        .limit(limit)

      if (search) {
        categoriesQuery = categoriesQuery.where(builder => {
          builder.where('title', 'ilike', `%${search}%`)
            .orWhere('description', 'ilike', `%${search}%`)
        })
      }

      const categories = await categoriesQuery

      const count = await db('categories').count('* as count')

      return { categories, pagination: { page, limit, total: count[0].count } }
    } catch (error) {
      throw new AppError(error.message, 500)
    }
  }

  async getCategoryById(id) {
    try {
      const category = await db('categories')
        .where({ id })
        .first()

      if (!category) {
        throw new NotFoundError('Category not found')
      }

      return category
    } catch (error) {
      throw error instanceof NotFoundError
        ? error
        : new AppError(error.message, 500)
    }
  }

  async updateCategory(id, updateData) {
    try {
      const updatedCategory = await db('categories')
        .where({ id })
        .update(updateData)
        .returning('*')

      if (!updatedCategory) {
        throw new NotFoundError('Category not found')
      }

      return updatedCategory
    } catch (error) {
      throw error instanceof NotFoundError
        ? error
        : new AppError(error.message, 500)
    }
  }

  async deleteCategory(id) {
    try {
      const deletedCategory = await db('categories')
        .where({ id })
        .del()
        .returning('*')

      if (!deletedCategory.length) {
        throw new NotFoundError('Category not found')
      }

      return { success: true }
    } catch (error) {
      throw error instanceof NotFoundError
        ? error
        : new AppError(error.message, 500)
    }
  }

  async getCategoryStats() {
    try {
      const stats = await db('categories')
        .select(
          'categories.id',
          'categories.title',
          db.raw('count(products.id) as product_count'),
          db.raw('sum(products.quantity) as total_stock')
        )
        .leftJoin('products', 'categories.id', 'products.category_id')
        .groupBy('categories.id', 'categories.title')

      return stats
    } catch (error) {
      throw new AppError(error.message, 500)
    }
  }
}

module.exports = new CategoryService()
