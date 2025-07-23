class ApiError extends Error {
  constructor(
    statusCode,
    message,
    details = [],
    isOperational = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  static UnauthorizedError(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static NotFoundError(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static InternalServerError(message = 'Internal server error') {
    return new ApiError(500, message);
  }

  static ConflictError(message = 'Resource already exists') {
    return new ApiError(409, message);
  }

  static BadRequestError(message = 'Bad request', details = []) {
    return new ApiError(400, message, details);
  }

  static ValidationError(message = 'Validation error', details = []) {
    return new ApiError(400, message, details);
  }
}

export default ApiError;
