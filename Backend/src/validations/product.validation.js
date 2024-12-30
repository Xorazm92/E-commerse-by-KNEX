import { z } from 'zod'

const createProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .nonempty('Name is required'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must not exceed 1000 characters')
      .nonempty('Description is required'),
    price: z
      .number()
      .positive('Price must be positive')
      .nonnegative('Price must be non-negative')
      .nonempty('Price is required'),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .nonnegative('Quantity cannot be negative')
      .nonempty('Quantity is required'),
    category_id: z
      .number()
      .int('Category ID must be an integer')
      .positive('Category ID must be positive')
      .nonempty('Category ID is required'),
    image_url: z.string().url('Invalid image URL'),
  }),
})

const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must not exceed 1000 characters'),
    price: z
      .number()
      .positive('Price must be positive')
      .nonnegative('Price must be non-negative'),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .nonnegative('Quantity cannot be negative'),
    category_id: z
      .number()
      .int('Category ID must be an integer')
      .positive('Category ID must be positive'),
    image_url: z.string().url('Invalid image URL'),
  }),
})

const productQuerySchema = z.object({
  query: z.object({
    page: z
      .number()
      .int('Page must be an integer')
      .min(1, 'Page must be greater than 0'),
    limit: z
      .number()
      .int('Limit must be an integer')
      .min(1, 'Limit must be greater than 0')
      .max(100, 'Limit cannot exceed 100'),
    category_id: z
      .number()
      .int('Category ID must be an integer')
      .positive('Category ID must be positive'),
    search: z.string().min(2, 'Search term must be at least 2 characters'),
    sort_by: z.string().oneOf(['name', 'price', 'created_at'], 'Invalid sort field'),
    order: z.string().oneOf(['asc', 'desc'], 'Invalid sort order'),
  }),
})

const productIdSchema = z.object({
  params: z.object({
    id: z
      .number()
      .int('Product ID must be an integer')
      .positive('Product ID must be positive')
      .nonempty('Product ID is required'),
  }),
})

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .min(1, '"name" majburiy maydon')
    .nonempty('"name" bosh bolishi mumkin emas'),
  short_description: z.string().optional(),
  full_description: z.string().optional(),
  category_id: z.string().uuid().optional(),
  seller_id: z.string().uuid().optional(),
  price: z
    .number()
    .min(0, '"price" musbat raqam bolishi kerak')
    .nonnegative('"price" 0 dan kichik bolmasligi kerak'),
  discount_price: z
    .number()
    .optional()
    .refine((val) => val === undefined || val >= 0, {
      message: '"discount_price" 0 dan kichik bolmasligi kerak',
    }),
  quantity: z.number().int().nonnegative().default(0),
  status: z.enum(['active', 'sold', 'on_sale']).default('active'),
  image_urls: z.array(z.string().url()).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
  productIdSchema,
}
