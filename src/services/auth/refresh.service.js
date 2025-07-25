import UserDto from '../../dtos/user.dto.js';
import UserRepository from '../../repositories/user.repository.js';
import SessionRepository from '../../repositories/session.repository.js';
import tokensService from '../tokens/index.js';
import ApiError from '../../errors/ApiError.js';

/**
 * Refreshes user session by validating the refresh token, updating session, and issuing new tokens.
 *
 * @param {string} refreshToken - The refresh token to validate and refresh the session.
 * @returns {Promise<{accessToken: string, refreshToken: string, user: UserDto}>}
 *          Object containing new access token, refresh token, and user DTO.
 * @throws {ApiError} If the refresh token is invalid or session/user not found.
 */
const refreshSession = async (refreshToken) => {
  if (!refreshToken) throw ApiError.UnauthorizedError();

  const userData = tokensService.validateRefreshToken(refreshToken);
  if (!userData) throw ApiError.UnauthorizedError();

  const sessionData = await SessionRepository.findSessionByRefreshToken(refreshToken);
  if (!sessionData) throw ApiError.UnauthorizedError();

  const user = await UserRepository.findUserById(userData.id);
  const userDto = new UserDto(user);

  const accessTokenData = tokensService.generateAccessToken(userDto);
  const refreshTokenData = tokensService.generateRefreshToken(userDto);

  await SessionRepository.createSession({
    userId: user.id,
    refreshToken: refreshTokenData.token,
    expiresAt: refreshTokenData.expiresAt,
  });

  return {
    accessToken: accessTokenData.token,
    refreshToken: refreshTokenData.token,
    user: userDto,
  };
};

export default refreshSession;
