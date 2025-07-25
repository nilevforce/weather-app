import ApiError from '../errors/ApiError.js';

const validateRequest = (schema, location = 'body') => (req, res, next) => {
  if (!schema) return next();

  const options = {
    abortEarly: false,
    stripUnknown: true,
    errors: {
      wrap: {
        label: false,
      },
    },
  };

  const { value, error } = schema.validate(req[location], options);

  if (error) {
    const details = error.details.map((item) => ({
      field: item.context.key !== undefined
        ? item.context.label
        : undefined,
      message: item.message,
    }));

    throw ApiError.ValidationError({ details });
  }

  req.validated = value;

  return next();
};

export default validateRequest;
