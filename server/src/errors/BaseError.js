class BaseError extends Error {
  constructor({
    name,
    message,
    statusCode,
    isOperational = true,
  }) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;
