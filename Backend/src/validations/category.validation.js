const yup = require('yup');

const createCategorySchema = yup.object({
  body: yup.object({
    name: yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .required('Name is required'),
    description: yup.string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must not exceed 500 characters'),
    parent_id: yup.number()
      .integer('Parent ID must be an integer')
      .positive('Parent ID must be positive')
      .nullable(),
    image_url: yup.string()
      .url('Invalid image URL')
  })
});

const updateCategorySchema = yup.object({
  body: yup.object({
    name: yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
    description: yup.string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must not exceed 500 characters'),
    parent_id: yup.number()
      .integer('Parent ID must be an integer')
      .positive('Parent ID must be positive')
      .nullable(),
    image_url: yup.string()
      .url('Invalid image URL')
  })
});

const categoryQuerySchema = yup.object({
  query: yup.object({
    page: yup.number()
      .integer('Page must be an integer')
      .min(1, 'Page must be greater than 0'),
    limit: yup.number()
      .integer('Limit must be an integer')
      .min(1, 'Limit must be greater than 0')
      .max(100, 'Limit cannot exceed 100'),
    parent_id: yup.number()
      .integer('Parent ID must be an integer')
      .positive('Parent ID must be positive'),
    sort_by: yup.string()
      .oneOf(['name', 'created_at'], 'Invalid sort field'),
    order: yup.string()
      .oneOf(['asc', 'desc'], 'Invalid sort order')
  })
});

const categoryIdSchema = yup.object({
  params: yup.object({
    id: yup.number()
      .integer('Category ID must be an integer')
      .positive('Category ID must be positive')
      .required('Category ID is required')
  })
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryQuerySchema,
  categoryIdSchema
};
