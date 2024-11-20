import mongoose from 'mongoose';
import { Orders } from '../schemas/index.js'; 

export const getAllOrders = async () => {
    try {
        const data = await Orders.find(); 
        if (!data.length) {
            throw new Error('Orders not found');
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getOrdersById = async (id) => {
    try {
        const data = await Orders.findById(id); 
        if (!data) {
            throw new Error('Order not found');
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createOrders = async (order) => {
    try {
        const newOrder = new Orders(order); 
        const data = await newOrder.save(); 
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteOrders = async (id) => {
    try {
        const data = await Orders.findByIdAndDelete(id); 
        if (!data) {
            throw new Error('Order not deleted for some reason');
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
