import { db } from '../database/index.js';

export const getAllOrders = async () => {
    try {
        const data = await db.select().from('orders'); 
        
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
        const data = await db.select().from("orders").where("id", "=", id); 
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
        const newOrder = await db("orders").insert(order).returning("*"); 
        return newOrder;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteOrders = async (id) => {
    try {
        const data = await db("orders").where("id", "=", id); 
        if (!data) {
            throw new Error('Order not deleted for some reason');
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
