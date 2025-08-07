import Joi from 'joi';

const weatherQuerySchema = Joi
  .object({
    city: Joi
      .string()
      .trim()
      .min(1)
      .max(100)
      .required(),
    lang: Joi
      .string()
      .trim()
      .valid('en', 'ru')
      .default('en'),
  });

export default weatherQuerySchema;
