import BaseError from './BaseError.js';
import { HttpStatusCode } from '../utils/index.js';

class ApiError extends BaseError {
  constructor({
    statusCode,
    message,
    details = [],
  } = {}) {
    super({
      name: 'ApiError',
      message,
      statusCode,
    });
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }

  static UnauthorizedError(options) {
    return new ApiError({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      message: options?.message || 'Unauthorized',
    });
  }

  static NotFoundError(options) {
    return new ApiError({
      statusCode: HttpStatusCode.NOT_FOUND,
      message: options?.message || 'Resource not found',
    });
  }

  static InternalServerError(options) {
    return new ApiError({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: options?.message || 'Internal server error',
    });
  }

  static ServiceUnavailable(options) {
    return new ApiError({
      statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
      message: options?.message || 'Service Unavailable',
    });
  }

  static BadGateway(options) {
    return new ApiError({
      statusCode: HttpStatusCode.BAD_GATEWAY,
      message: options?.message || 'Bad Gateway',
    });
  }

  static ConflictError(options) {
    return new ApiError({
      statusCode: HttpStatusCode.CONFLICT,
      message: options?.message || 'Resource already exists',
    });
  }

  static BadRequestError(options) {
    return new ApiError({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: options?.message || 'Bad request',
    });
  }

  static ValidationError(options) {
    return new ApiError({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: options?.message || 'Invalid input data',
      details: options?.details || [],
    });
  }
}

export default ApiError;
