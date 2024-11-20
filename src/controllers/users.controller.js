import { logger } from '../utils/index.js'
import {
    createUserService,
    deleteUserService,
    getUserSevice,
    updateUserService
} from '../services/index.js'

export const getAllUserController = async (req, res, next) => {
    try {
        const allData = await getUserSevice('all')
        res.status(200).send({
            message: 'success',
            data: allData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}



export const getUserByIdController = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await getUserSevice('id', id)
        if(data.length === 0){
            throw new AppError('user not found', 404)
        }
        res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const createUserController = async (req, res, next) => {
    try {
        const newData = await createUserService(req.body)
        res.status(201).send({
            message: 'created',
            data: newData.id,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateUserController = async (req, res, next) => {
    try {

        const id = req.params.id
        const data = req.body
        const updateData = await updateUserService(id, data)
        res.status(200).send({
            message: 'updated',
            data: updateData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const deleteUserController = async (req, res, next) => {
    try {
        const id = req.params.id
      
        const deleteUser = await deleteUserService(id)
        res.status(200).send({
            message: 'deleted',
            data: deleteUser,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
