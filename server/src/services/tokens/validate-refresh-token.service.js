import jwt from '../../lib/jwt.js';
import config from '../../config/config.js';

/**
 * Validates a JWT refresh token.
 *
 * @param {string} token - JWT refresh token to verify.
 * @returns {Object|null} Decoded payload if valid, otherwise null.
 */
const validateRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

export default validateRefreshToken;
