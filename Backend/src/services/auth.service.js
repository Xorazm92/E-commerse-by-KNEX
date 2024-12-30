import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { UnauthorizedError, NotFoundError } from '../utils/errors';

class AuthService {
  async register(userData) {
    const existingUser = await User.query().findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user = await User.query().insert({
      ...userData,
      role: 'user'  // Default role for new users
    });

    const token = this.generateToken(user);
    return { user, token };
  }

  async login(email, password) {
    const user = await User.query().findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  generateToken(user) {
    return jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  async getUserProfile(userId) {
    const user = await User.query()
      .findById(userId)
      .withGraphFetched('[orders, cart.cartItems.product]');
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  async updateUserProfile(userId, updateData) {
    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData.role;
    
    const user = await User.query()
      .patchAndFetchById(userId, updateData);
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isValidPassword = await user.verifyPassword(oldPassword);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid current password');
    }

    await User.query()
      .patch({ password: newPassword })
      .where('id', userId);

    return { success: true };
  }

  async getAllUsers(query = {}) {
    const { page = 1, limit = 10, role, search } = query;
    
    let usersQuery = User.query()
      .select('id', 'email', 'role', 'first_name', 'last_name', 'created_at')
      .page(page - 1, limit);

    if (role) {
      usersQuery = usersQuery.where('role', role);
    }

    if (search) {
      usersQuery = usersQuery.where(builder => {
        builder.where('email', 'ilike', `%${search}%`)
          .orWhere('first_name', 'ilike', `%${search}%`)
          .orWhere('last_name', 'ilike', `%${search}%`);
      });
    }

    return await usersQuery;
  }

  async updateUserRole(userId, role) {
    const user = await User.query()
      .patchAndFetchById(userId, { role });
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }
}

export default new AuthService();
