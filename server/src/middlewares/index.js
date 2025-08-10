import errorHandler from './error-handler.middleware.js';
import validateRequest from './validate-request.middleware.js';
import requestLogger from './request-logger.middleware.js';
import corsMiddleware from './cors.middleware.js';
import jsonMiddleware from './json.middleware.js';
import authMiddleware from './auth.middleware.js';
import notFoundMiddleware from './not-found.middleware.js';
import checkRole from './roles.middleware.js';

export default {
  cors: corsMiddleware,
  json: jsonMiddleware,
  auth: authMiddleware,
  notFound: notFoundMiddleware,
  validateRequest,
  requestLogger,
  errorHandler,
  checkRole,
};
