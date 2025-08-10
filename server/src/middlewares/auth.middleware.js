import { UnauthorizedError } from '../errors/api/index.js';
import tokensService from '../services/tokens/index.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new UnauthorizedError();

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) throw new UnauthorizedError();

  const userData = tokensService.validateAccessToken(accessToken);
  if (!userData) throw new UnauthorizedError();

  req.user = userData;

  return next();
};

export default authMiddleware;
