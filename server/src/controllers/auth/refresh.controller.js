import authService from '../../services/auth/index.js';

/**
 * Handles session refresh request.
 * Validates refresh token, issues new tokens, and updates cookie.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const userData = await authService.refresh(refreshToken);

  res.cookie(
    'refreshToken',
    userData.refreshToken,
    {
      maxAge: userData.refreshTokenExpiresAt,
      httpOnly: true,
      secure: false,
    },
  );

  res.status(200).json(userData);
};

export default refresh;
