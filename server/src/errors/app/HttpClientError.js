import AppError from './AppError.js';

/**
 * Error class for HTTP client errors.
 */
class HttpClientError extends AppError {
  /**
   * @param {Object} params - Error parameters
   * @param {string} [params.message] - Error message
   * @param {number} [params.status] - HTTP status code
   * @param {string|null} [params.code] - Error code
   * @param {string|null} [params.url] - Request URL
   * @param {any} [params.body] - Request or response body
   * @param {any} [params.cause] - The original error that caused this error
   */
  constructor({
    message = 'HTTP Error',
    status = 500,
    code = null,
    url = null,
    body = null,
    cause = null,
  }) {
    super({ message, cause });

    this.status = status;
    this.code = code;
    this.url = url;
    this.body = body;
  }

  /**
   * Converts the error to a JSON object.
   * @returns {Object} JSON representation of the error
   */
  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      url: this.url,
      body: this.body,
      name: this.name,
    };
  }
}

export default HttpClientError;
