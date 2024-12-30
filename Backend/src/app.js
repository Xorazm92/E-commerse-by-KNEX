import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import routes
import { authRouter } from './routers/auth.routes.js';
import { productRouter } from './routers/products.routes.js';
import { cartsRouter } from './routers/carts.routes.js';
import { orderRouter } from './routers/orders.routes.js';
import { paymentsRouter } from './routers/payments.routes.js';

// Import middlewares
import { errorHandler } from './middlewares/error.middleware.js';
import { protect as authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// API routes
const API_PREFIX = process.env.API_PREFIX || '/api/v1';
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/products`, productRouter);
app.use(`${API_PREFIX}/cart`, authMiddleware, cartsRouter);
app.use(`${API_PREFIX}/orders`, authMiddleware, orderRouter);
app.use(`${API_PREFIX}/payment`, authMiddleware, paymentsRouter);

// Error handling
app.use(errorHandler);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const FRONTEND_PATH = join(__dirname, '../../Frontend/build');
  app.use(express.static(FRONTEND_PATH));

  app.get('*', (req, res) => {
    res.sendFile(join(FRONTEND_PATH, 'index.html'));
  });
}

//unhandlede rejection and uncaught exception lar
process.on('uncaughtException', (err) => {
  console.error(err.message)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled rejection: ${reason}`)
  process.exit(1)
})

export default app;
