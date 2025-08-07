import authService from '../../services/auth/index.js';

/**
 * Handles user signout request.
 * Removes the session by refresh token and clears the cookie.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const signout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) await authService.signout(refreshToken);

  res.clearCookie('refreshToken');
  res.status(204).json();
};

export default signout;
