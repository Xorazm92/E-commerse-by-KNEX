import 'dotenv/config'
import app from './src/app.js'
import { logger } from './src/utils/index.js'

const PORT = process.env.PORT || 3555

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            logger.info(`Server is running on port: ${PORT}`)
            logger.info(`Visit: http://localhost:${PORT}`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
        process.exit(1)
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error)
    process.exit(1)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    logger.error('Unhandled Rejection:', error)
    process.exit(1)
})

startServer()
