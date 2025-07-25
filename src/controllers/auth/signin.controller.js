import config from '../../config/config.js';
import authService from '../../services/auth/index.js';

/**
 * Handles user signin request.
 * Authenticates user, sets refresh token cookie, and returns user data.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const signin = async (req, res) => {
  const userData = await authService.signinByEmail({
    email: req.body.email,
    password: req.body.password,
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
    origin: req.headers.origin || req.headers.referer,
  });

  res.cookie(
    'refreshToken',
    userData.refreshToken,
    {
      maxAge: config.jwtRefreshTokenExpiresIn * 1000,
      httpOnly: true,
      secure: false,
    },
  );

  res.status(200).json({ ok: true, data: userData });
};

export default signin;
