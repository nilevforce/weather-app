import logger from '../lib/logger.js';
import ApiError from '../errors/ApiError.js';
import { getErrorMessage } from '../utils/index.js';

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    details: err.details || {},
    statusCode: err.statusCode,
    errorCode: err.errorCode,
  });

  const processedError = err instanceof ApiError
    ? err
    : ApiError.InternalServerError();

  const response = {
    error: {
      message: getErrorMessage(processedError),
      ...(processedError.details.length > 0 && { details: processedError.details }),
    },
  };

  res.status(processedError.statusCode).json(response);
};

export default errorHandler;
