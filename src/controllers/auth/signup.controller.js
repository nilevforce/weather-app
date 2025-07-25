import authService from '../../services/auth/index.js';

/**
 * Handles user signup request.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
const signup = async (req, res) => {
  await authService.signupByEmail({
    email: req.body.email,
    password: req.body.password,
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
    origin: req.headers.origin || req.headers.referer,
  });

  res.status(201).json();
};

export default signup;
