import { z } from 'zod'

export const cartSchema = z.object({
    customer_id: z
        .string()
        .uuid("Invalid UUID format for 'customer_id'")
        .nullable(),
    product_id: z
        .string()
        .uuid("Invalid UUID format for 'product_id'")
        .nullable(),
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be greater than zero'),
    added_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for 'added_at'",
    }),
})

const addToCartSchema = z.object({
  body: z.object({
    product_id: z.number()
      .int('Product ID must be an integer')
      .positive('Product ID must be positive')
      .required('Product ID is required'),
    quantity: z.number()
      .int('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .required('Quantity is required')
  })
});

const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number()
      .int('Quantity must be an integer')
      .min(1, 'Quantity must be at least 1')
      .required('Quantity is required')
  }),
  params: z.object({
    id: z.number()
      .int('Cart item ID must be an integer')
      .positive('Cart item ID must be positive')
      .required('Cart item ID is required')
  })
});

const cartItemIdSchema = z.object({
  params: z.object({
    id: z.number()
      .int('Cart item ID must be an integer')
      .positive('Cart item ID must be positive')
      .required('Cart item ID is required')
  })
});

export const validationSchemas = {
  addToCartSchema,
  updateCartItemSchema,
  cartItemIdSchema
};
