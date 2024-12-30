const yup = require('yup');

const registerSchema = yup.object({
  body: yup.object({
    email: yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .required('Password is required'),
    first_name: yup.string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    last_name: yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
    phone: yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
    address: yup.string()
      .min(10, 'Address must be at least 10 characters')
  })
});

const loginSchema = yup.object({
  body: yup.object({
    email: yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string()
      .required('Password is required')
  })
});

const updateProfileSchema = yup.object({
  body: yup.object({
    first_name: yup.string()
      .min(2, 'First name must be at least 2 characters'),
    last_name: yup.string()
      .min(2, 'Last name must be at least 2 characters'),
    phone: yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
    address: yup.string()
      .min(10, 'Address must be at least 10 characters')
  })
});

const changePasswordSchema = yup.object({
  body: yup.object({
    current_password: yup.string()
      .required('Current password is required'),
    new_password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .required('New password is required'),
    confirm_password: yup.string()
      .oneOf([yup.ref('new_password')], 'Passwords must match')
      .required('Password confirmation is required')
  })
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema
};
