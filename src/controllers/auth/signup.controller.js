import authService from '../../services/auth/index.js';

const signup = async (req, res) => {
  const userData = await authService.signup({
    email: req.body.email,
    password: req.body.password,
    userAgent: req.headers['user-agent'],
    fingerprint: req.body.fingerprint,
    ip: req.ip,
  });

  res.cookie(
    'refreshToken',
    userData.refreshToken,
    {
      maxAge: userData.refreshTokenExpiresAt,
      httpOnly: true,
    },
  );
  res.status(200).json({ ok: true, data: userData });
};

export default signup;
