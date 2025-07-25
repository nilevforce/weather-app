import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

/**
 * Generates a JWT refresh token.
 *
 * @param {Object} payload - Data to be encoded in the token.
 * @returns {{ token: string, expiresAt: Date }} Object with token and expiration date.
 */
const generateRefreshToken = (payload) => {
  const now = new Date();

  const TOKEN_SECRET = config.jwtRefreshSecret;
  const TOKEN_EXPIRES_IN = config.jwtRefreshTokenExpiresIn;
  const TOKEN_EXPIRES_AT = new Date(now.getTime() + TOKEN_EXPIRES_IN * 1000);

  const token = jwt.sign(
    { ...payload },
    TOKEN_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN },
  );

  return {
    token,
    expiresAt: TOKEN_EXPIRES_AT,
  };
};

export default generateRefreshToken;
