# E-Commerce Platform

A full-stack e-commerce platform built with Node.js, Express, PostgreSQL, and vanilla JavaScript.

## Features

- User authentication (login/register)
- Product catalog with categories
- Shopping cart functionality
- Secure payment processing with Stripe
- Order management
- User profile management
- Product reviews and ratings
- Admin dashboard
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce
```

2. Install dependencies:
```bash
cd Backend
npm install
cd ../Frontend
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration

4. Set up the database:
```bash
cd Backend
npx knex migrate:latest
npx knex seed:run
```

5. Start the server:
```bash
cd Backend
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=ecommerce
DB_PORT=5432
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```

## API Documentation

### Authentication
- POST /api/v1/auth/register - Register a new user
- POST /api/v1/auth/login - Login user
- POST /api/v1/auth/logout - Logout user

### Products
- GET /api/v1/products - Get all products
- GET /api/v1/products/:id - Get product by ID
- POST /api/v1/products - Create new product (admin only)
- PUT /api/v1/products/:id - Update product (admin only)
- DELETE /api/v1/products/:id - Delete product (admin only)

### Cart
- GET /api/v1/cart - Get user's cart
- POST /api/v1/cart/add - Add item to cart
- PUT /api/v1/cart/:id - Update cart item
- DELETE /api/v1/cart/:id - Remove item from cart

### Orders
- GET /api/v1/orders - Get user's orders
- POST /api/v1/orders - Create new order
- GET /api/v1/orders/:id - Get order by ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
