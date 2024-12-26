import Stripe from 'stripe';
import { config } from '../configs/index.js';
import { logger } from '../utils/index.js';
import { AppError } from '../utils/index.js';

const stripe = new Stripe(config.stripe.secretKey);

export const stripeService = {
    // Create payment intent
    createPaymentIntent: async (amount, currency = 'usd') => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Convert to cents
                currency: currency,
            });

            return paymentIntent;
        } catch (error) {
            logger.error('Stripe payment intent error:', error);
            throw new AppError('Payment processing failed', 500);
        }
    },

    // Process payment
    processPayment: async (paymentMethodId, amount) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true,
                return_url: 'http://localhost:3000/payment-success',
            });

            return paymentIntent;
        } catch (error) {
            logger.error('Stripe payment processing error:', error);
            throw new AppError('Payment processing failed', 500);
        }
    },

    // Create customer
    createCustomer: async (email, paymentMethodId) => {
        try {
            const customer = await stripe.customers.create({
                email: email,
                payment_method: paymentMethodId,
            });

            return customer;
        } catch (error) {
            logger.error('Stripe customer creation error:', error);
            throw new AppError('Customer creation failed', 500);
        }
    },

    // Create subscription
    createSubscription: async (customerId, priceId) => {
        try {
            const subscription = await stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
            });

            return subscription;
        } catch (error) {
            logger.error('Stripe subscription creation error:', error);
            throw new AppError('Subscription creation failed', 500);
        }
    },

    // Cancel subscription
    cancelSubscription: async (subscriptionId) => {
        try {
            const canceledSubscription = await stripe.subscriptions.del(
                subscriptionId
            );

            return canceledSubscription;
        } catch (error) {
            logger.error('Stripe subscription cancellation error:', error);
            throw new AppError('Subscription cancellation failed', 500);
        }
    },

    // Create refund
    createRefund: async (paymentIntentId) => {
        try {
            const refund = await stripe.refunds.create({
                payment_intent: paymentIntentId,
            });

            return refund;
        } catch (error) {
            logger.error('Stripe refund creation error:', error);
            throw new AppError('Refund creation failed', 500);
        }
    },
};
