import Joi from 'joi';

const signupSchema = Joi
  .object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Email must be valid',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
      }),
  })
  .required()
  .messages({
    'any.required': 'Request body is required',
  });

export default signupSchema;
