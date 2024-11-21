import { Addresses } from "../schemas/index.js"
import { AppError } from "../utils/appError.js"
import { logger } from "../utils/logger.js"
import {db} from "../database/index.js";

export const getAllAddressesService = async () =>{
    try {
        // const allData = await Addresses.find()
        const allData = await db('addresses').select('*');
        return allData
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const getAddressesByIdService = async (data) =>{
    try {
        // const allData = await Addresses.findById(data)
        const allData = await db('addresses').where({ id }).select('*');
        return allData
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const createAddressesService = async (data) =>{
    try {
        
        // const newData = await Addresses(data)
        
        // await newData.save()

        const newData = await db('addresses').insert({
            user_id: data[0],
            title: data[1],
            country: data[2],
            city: data[3],
            postal_code: data[4],
            phone_number: data[5],
            landmark: data[6]
        }).returning('*');
        return newData
    } catch (error) {
        logger.error(error)
        return error
    }
}


export const updateAddressesService = async (id, data) =>{
    try {
    
        // const updateData = await Addresses.findByIdAndUpdate(id, data)
        // if(updateData.length === 0){
        //     throw new AppError('address not found', 404)
        // }

        const updatedData = await db('addresses')
            .where({ id: data[7] }) // id ni oxirgi element sifatida qabul qiling
            .update({
                user_id: data[0],
                title: data[1],
                country: data[2],
                city: data[3],
                postal_code: data[4],
                phone_number: data[5],
                landmark: data[6]
            })
            .returning('*');

        return updateData
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const deleteAddressesService = async(id) =>{
    try {
        // const deleteUser = await Addresses.findByIdAndDelete(id)
        // if(updateData.length === 0){
        //     throw new AppError('address not found', 404)
        // }
        const deletedData = await db('addresses')
        .where({ id })
        .del()
        .returning('*');
        
        return deleteUser.rows
    } catch (error) {
        logger.error(error)
    }
}
