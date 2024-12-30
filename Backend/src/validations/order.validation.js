const yup = require('yup');

const createOrderSchema = yup.object({
  body: yup.object({
    shipping_address: yup.string()
      .min(10, 'Shipping address must be at least 10 characters')
      .required('Shipping address is required'),
    payment_method: yup.string()
      .oneOf(['card', 'cash'], 'Invalid payment method')
      .required('Payment method is required')
  })
});

const updateOrderStatusSchema = yup.object({
  body: yup.object({
    status: yup.string()
      .oneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 'Invalid order status')
      .required('Order status is required')
  })
});

const orderQuerySchema = yup.object({
  query: yup.object({
    page: yup.number()
      .integer('Page must be an integer')
      .min(1, 'Page must be greater than 0'),
    limit: yup.number()
      .integer('Limit must be an integer')
      .min(1, 'Limit must be greater than 0')
      .max(100, 'Limit cannot exceed 100'),
    status: yup.string()
      .oneOf(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 'Invalid order status'),
    sort_by: yup.string()
      .oneOf(['created_at', 'total_amount'], 'Invalid sort field'),
    order: yup.string()
      .oneOf(['asc', 'desc'], 'Invalid sort order')
  })
});

const orderIdSchema = yup.object({
  params: yup.object({
    id: yup.number()
      .integer('Order ID must be an integer')
      .positive('Order ID must be positive')
      .required('Order ID is required')
  })
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  orderQuerySchema,
  orderIdSchema
};
