import {
    createAddressesService,
    deleteAddressesService,
    getAddressesByIdService,
    getAllAddressesService,
    updateAddressesService,
} from '../services/index.js'

export const getAllAddressessController = async (req, res, next) => {
    try {
        const allData = await getAllAddressesService()
        res.status(200).send({
            message: 'success',
            data: allData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAddressessByIdController = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await getAddressesByIdService(id)
        res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const createAddressessController = async (req, res, next) => {
    try {
        const user = req.body
        const newData = await createAddressesService(user)
        res.status(201).send({
            message: 'created',
            data: newData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateAddressessController = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const updateData = await updateAddressesService(id, data)
        res.status(200).send({
            message: 'updated',
            data: updateData,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteAddressessController = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleteAddres = await deleteAddressesService(id)
        res.status(200).send({
            message: 'delete',
            data: deleteAddres,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
