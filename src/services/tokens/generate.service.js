import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const generate = async (payload) => {
  // Define expiration times in seconds
  const ACCESS_TOKEN_EXPIRES_IN = 60 * 30; // 30 minutes
  const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days

  const now = Math.floor(Date.now() / 1000); // current time in seconds
  const accessTokenExpiresAt = now + ACCESS_TOKEN_EXPIRES_IN;
  const refreshTokenExpiresAt = now + REFRESH_TOKEN_EXPIRES_IN;

  const accessToken = jwt.sign(
    { ...payload, exp: accessTokenExpiresAt },
    config.jwtAccessSecret,
  );

  const refreshToken = jwt.sign(
    { ...payload, exp: refreshTokenExpiresAt },
    config.jwtRefreshSecret,
  );

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt: new Date(accessTokenExpiresAt * 1000), // Convert to Date object
    refreshTokenExpiresAt: new Date(refreshTokenExpiresAt * 1000), // Convert to Date object
  };
};

export default generate;
