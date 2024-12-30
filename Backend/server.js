import 'dotenv/config';
import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import db from './src/database/connection.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await db.raw('SELECT 1');
    logger.info('Database connection established');

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received');
  process.exit(0);
});

// Handle SIGINT signal
process.on('SIGINT', () => {
  logger.info('SIGINT signal received');
  process.exit(0);
});

startServer();
