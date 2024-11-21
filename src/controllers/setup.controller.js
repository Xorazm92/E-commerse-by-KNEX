import { migrate } from "../migration/index.js"

export const setupController = async (req, res, next) => {
    try {
        const result = await migrate();
        return res.status(200).json({
            status: result.status,
            message: result.message,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}