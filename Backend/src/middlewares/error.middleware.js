const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Check if error is operational
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Handle Knex.js specific errors
  if (err.code === '23505') { // unique violation
    return res.status(409).json({
      status: 'fail',
      message: 'Duplicate entry',
    });
  }

  if (err.code === '23503') { // foreign key violation
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid reference',
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Token expired',
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'fail',
      message: 'File too large',
    });
  }

  // Handle stripe errors
  if (err.type === 'StripeCardError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  // If error is not operational, send generic error message
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong'
    : err.message;

  return res.status(500).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { errorHandler };
