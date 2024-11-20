import { Addresses } from "../schemas/index.js"
import { AppError } from "../utils/appError.js"
import { logger } from "../utils/logger.js"

export const getAllAddressesService = async (query) =>{
    try {
        const allData = await Addresses.find()
        return allData
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const getAddressesByIdService = async (data) =>{
    try {
        const allData = await Addresses.findById(data)
        return allData
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const createAddressesService = async (data) =>{
    try {
        
        const newData = await Addresses(data)
        
        await newData.save()
        return newData
    } catch (error) {
        logger.error(error)
        return error
    }
}


export const updateAddressesService = async (id, data) =>{
    try {
    
        const updateData = await Addresses.findByIdAndUpdate(id, data)
        if(updateData.length === 0){
            throw new AppError('address not found', 404)
        }
        return updateData
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const deleteAddressesService = async(id) =>{
    try {
        const deleteUser = await Addresses.findByIdAndDelete(id)
        if(updateData.length === 0){
            throw new AppError('address not found', 404)
        }
        return deleteUser.rows
    } catch (error) {
        logger.error(error)
    }
}
