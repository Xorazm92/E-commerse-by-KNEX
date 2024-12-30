// API Configuration
const API_CONFIG = {
    development: {
        BASE_URL: 'http://localhost:3000/api/v1',
        STRIPE_PUBLIC_KEY: 'your-stripe-public-key'
    },
    production: {
        BASE_URL: 'https://api.nbt.zufariy.uz/api/v1',
        STRIPE_PUBLIC_KEY: 'your-stripe-public-key'
    }
};

// Current environment
const ENV = 'development';

// Export configuration
export const API_BASE_URL = API_CONFIG[ENV].BASE_URL;
export const STRIPE_PUBLIC_KEY = API_CONFIG[ENV].STRIPE_PUBLIC_KEY;
