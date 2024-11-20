import {
    getAllOrders,
    getOrdersById,
    createOrders,
    deleteOrders,
} from '../services/index.js'
import { logger } from '../utils/index.js'

export const getAllOrdersController =   async  (req, res, next) => {
    try {

        const data = await getAllOrders()
        return res.send({
            msg: 'Ok',
            data: data,
        })
    } catch (error) {0
        logger.error(error)
        next(error)

    }
}
export const  getOrderByIdController = async (req, res, next) => {
    try {
        const data = await getOrdersById(req.params.id)
        return res.send({
            msg: 'Ok',
            data: data,
        })
    } catch (error) {
        logger.error(error

        )
        next(error)
    }
}
export const  createOrderController = async(req, res, next) =>  {
    try {

        const data = await createOrders(req.body)
        return res.send({
            msg: 'Ok',
            data: data,
        })
    } catch (error) {
        logger.error(error

        )
        next(error)
    }
}
export const deleteOrderByIdController = async(req, res, next) =>  {
    try {

        const data = await deleteOrders(req.params.id)
        return res.send({
            msg: 'Ok',
            data: data,
        })
    } catch (error) {
        logger.error(error
        )
        next(error)
    }
}