import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

/**
 * Validates a JWT access token.
 *
 * @param {string} token - JWT refresh token to verify.
 * @returns {Object|null} Decoded payload if valid, otherwise null.
 */
const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    return null;
  }
};

export default validateAccessToken;
