const { ValidationError } = require('../utils/errors');

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, {
        abortEarly: false,
        stripUnknown: true,
      });

      // Replace request data with validated data
      req.body = validatedData.body;
      req.query = validatedData.query;
      req.params = validatedData.params;
      
      next();
    } catch (err) {
      // Format Yup validation errors
      const errors = err.inner.reduce((acc, error) => {
        const path = error.path.split('.')[1]; // Remove 'body.', 'query.', etc.
        acc[path] = error.message;
        return acc;
      }, {});

      next(new ValidationError('Validation failed', errors));
    }
  };
};

module.exports = { validate };
