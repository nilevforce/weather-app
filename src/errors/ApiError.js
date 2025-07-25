class ApiError extends Error {
  constructor({
    statusCode,
    message,
    details = [],
    isOperational = true,
  } = {}) { // Добавляем значение по умолчанию для всего объекта
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  static UnauthorizedError(options) {
    return new ApiError({
      statusCode: 401,
      message: options?.message || 'Unauthorized',
      details: options?.details,
    });
  }

  static NotFoundError(options) {
    return new ApiError({
      statusCode: 404,
      message: options?.message || 'Resource not found',
      details: options?.details,
    });
  }

  static InternalServerError(options) {
    return new ApiError({
      statusCode: 500,
      message: options?.message || 'Internal server error',
      details: options?.details,
    });
  }

  static ConflictError(options) {
    return new ApiError({
      statusCode: 409,
      message: options?.message || 'Resource already exists',
      details: options?.details,
    });
  }

  static BadRequestError(options) {
    return new ApiError({
      statusCode: 400,
      message: options?.message || 'Bad request',
      details: options?.details || [],
    });
  }

  static ValidationError(options) {
    return new ApiError({
      statusCode: 400,
      message: options?.message || 'Validation error',
      details: options?.details || [],
    });
  }
}

export default ApiError;
