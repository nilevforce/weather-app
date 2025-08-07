import SessionRepository from '../../repositories/session.repository.js';

/**
 * Signs out a user by removing their session using the refresh token.
 *
 * @param {string} refreshToken - The refresh token of the session to remove.
 * @returns {Promise<Object>} The deleted session object.
 */
const signout = async (refreshToken) => {
  const deletedCount = await SessionRepository
    .removeSessionByRefreshToken(refreshToken);

  return deletedCount;
};

export default signout;
