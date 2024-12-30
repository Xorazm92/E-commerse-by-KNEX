const { NotFoundError } = require('../utils/errors');

const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server`));
};

module.exports = { notFoundHandler };
