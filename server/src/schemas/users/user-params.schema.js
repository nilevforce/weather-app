import Joi from 'joi';

const userParamsSchema = Joi
  .object({
    id: Joi
      .string()
      .trim()
      .required()
      .messages({
        'string.pattern.base': 'Invalid user ID format. Expected CUID format',
        'string.empty': 'User ID cannot be empty',
        'any.required': 'User ID is required',
      }),
  });

export default userParamsSchema;
