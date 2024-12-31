import { logger } from '../utils/logger.js';
import { AppError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
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

  // Handle Objection.js errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid input data',
      errors: err.data,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      status: 'fail',
      message: 'Resource not found',
    });
  }

  if (err.name === 'UniqueViolationError') {
    return res.status(409).json({
      status: 'fail',
      message: 'Duplicate field value',
      field: err.columns[0],
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

  // Handle multer errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  // Handle other errors
  console.error('Error 💥:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { error: err, stack: err.stack }),
  });
};

export default errorHandler;
