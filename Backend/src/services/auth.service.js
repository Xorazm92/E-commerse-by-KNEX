import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { logger } from '../utils/index.js';
import db from '../database/index.js';

export const authService = {
    // Register new user
    register: async (userData) => {
        try {
            // Check if user exists
            const existingUser = await db('users')
                .where('email', userData.email)
                .first();
            
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            // Create user
            const [user] = await db('users')
                .insert({
                    ...userData,
                    password: hashedPassword,
                    role: 'user'
                })
                .returning('*');

            // Create profile
            await db('profiles')
                .insert({
                    user_id: user.id,
                    full_name: userData.full_name || '',
                    phone: userData.phone || ''
                });

            return user;
        } catch (error) {
            logger.error('Register service error:', error);
            throw error;
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            // Find user
            const user = await db('users')
                .where('email', credentials.email)
                .first();

            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Check password
            const isValidPassword = await bcrypt.compare(
                credentials.password,
                user.password
            );

            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                config.jwt.secret,
                { expiresIn: '24h' }
            );

            return { token, user: { id: user.id, email: user.email, role: user.role } };
        } catch (error) {
            logger.error('Login service error:', error);
            throw error;
        }
    },

    // Reset password
    resetPassword: async (email, newPassword) => {
        try {
            // Find user
            const user = await db('users')
                .where('email', email)
                .first();

            if (!user) {
                throw new Error('User not found');
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update password
            await db('users')
                .where('id', user.id)
                .update({ password: hashedPassword });

            return true;
        } catch (error) {
            logger.error('Reset password service error:', error);
            throw error;
        }
    },

    // Verify JWT token
    verifyToken: async (token) => {
        try {
            const decoded = jwt.verify(token, config.jwt.secret);
            const user = await db('users')
                .where('id', decoded.id)
                .first();

            if (!user) {
                throw new Error('User not found');
            }

            return decoded;
        } catch (error) {
            logger.error('Token verification error:', error);
            throw error;
        }
    }
};
