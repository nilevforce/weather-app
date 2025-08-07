import ApiError from '../errors/ApiError.js';
import tokensService from '../services/tokens/index.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw ApiError.UnauthorizedError();

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) throw ApiError.UnauthorizedError();

  const userData = tokensService.validateAccessToken(accessToken);
  if (!userData) throw ApiError.UnauthorizedError();

  req.user = userData;

  return next();
};

export default authMiddleware;
