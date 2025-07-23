import errorHandler from './error-handler.middleware.js';
import validateRequest from './validate-request.middleware.js';
import requestLogger from './request-logger.middleware.js';
import corsMiddleware from './cors.middleware.js';
import jsonMiddleware from './json.middleware.js';

export default {
  cors: corsMiddleware,
  json: jsonMiddleware,
  validateRequest,
  requestLogger,
  errorHandler,
};
