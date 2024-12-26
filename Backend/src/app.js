import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

import { routers } from './routers/index.js'
import { logger } from './utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FRONTEND_PATH = path.join(__dirname, '../../Frontend')

const app = express()

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP address',
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(limiter)
app.use(morgan('dev'))
app.use(helmet({
    contentSecurityPolicy: false,
}))
app.use(cors())

// Static files
app.use(express.static(FRONTEND_PATH))

// API routes
app.use('/api/v1', routers)

// Frontend routes
app.get('/', (req, res) => {
    res.sendFile(path.join(FRONTEND_PATH, 'index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(FRONTEND_PATH, 'login.html'))
})

// Error handling
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found'
    })
})

app.use((err, req, res, next) => {
    logger.error(err.message)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
})

//unhandlede rejection and uncaught exception lar
process.on('uncaughtException', (err) => {
    logger.error(err.message)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled rejection: ${reason}`)
    process.exit(1)
})

export default app
