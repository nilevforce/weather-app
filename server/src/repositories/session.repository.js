import prisma from '../lib/prisma.js';

class SessionRepository {
  /**
   * Creates a new session for the user.
   *
   * Deletes previous sessions with the same userId, userAgent, and ip,
   * then creates a new one.
   *
   * @param {Object} params - Session parameters.
   * @param {string} params.userId - User identifier.
   * @param {string} params.refreshToken - Refresh token for the session.
   * @param {Date} params.expiresAt - Expiration date of the session.
   * @param {string} [params.userAgent] - User agent string (optional).
   * @param {string} [params.origin] - Origin of the request (optional).
   * @param {string} [params.ip] - IP address of the user (optional).
   * @returns {Promise<Object>} Created session object.
   */
  static async createSession(
    {
      userId,
      refreshToken,
      expiresAt,
      userAgent,
      origin,
      ip,
    },
  ) {
    await prisma.session.deleteMany({
      where: {
        userId,
        userAgent,
        ip,
      },
    });

    const session = await prisma.session.create({
      data: {
        userId,
        refreshToken,
        expiresAt,
        userAgent,
        origin,
        ip,
      },
    });

    return session;
  }

  /**
   * Finds a session by its refresh token.
   *
   * @param {string} refreshToken - Refresh token to search for.
   * @returns {Promise<Object|null>} Session object if found, otherwise null.
   */
  static async findSessionByRefreshToken(refreshToken) {
    const session = await prisma.session.findFirst({
      where: { refreshToken },
    });

    return session;
  }

  /**
   * Removes a session by its refresh token.
   *
   * @param {string} refreshToken - Refresh token of the session to remove.
   * @returns {Promise<Object>} Deleted session object.
   */
  static async removeSessionByRefreshToken(refreshToken) {
    const removedSession = await prisma.session.delete({
      where: { refreshToken },
    });

    return removedSession;
  }
}

export default SessionRepository;
