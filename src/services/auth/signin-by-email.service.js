import bcrypt from 'bcrypt';
import ApiError from '../../errors/ApiError.js';
import UserDto from '../../dtos/user.dto.js';
import UserRepository from '../../repositories/user.repository.js';
import SessionRepository from '../../repositories/session.repository.js';
import tokensService from '../tokens/index.js';

/**
 * Authenticates a user by email and password, creates a session, and returns tokens.
 *
 * @param {Object} params - Signin parameters.
 * @param {string} params.email - User email address.
 * @param {string} params.password - User password (plain text).
 * @param {string} [params.origin] - Origin of the request (optional).
 * @param {string} [params.userAgent] - User agent string (optional).
 * @param {string} [params.ipAddress] - IP address of the user (optional).
 * @returns {Promise<{ accessToken: string, refreshToken: string, user: Object }>} Auth data.
 * @throws {ApiError} If authentication fails.
 */
const signinByEmail = async (
  {
    email,
    password,
    origin,
    userAgent,
    ipAddress,
  },
) => {
  const user = await UserRepository.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw ApiError.UnauthorizedError({
      message: 'Invalid email or password',
    });
  }

  const userDto = new UserDto(user);

  const accessTokenData = tokensService.generateAccessToken(userDto);
  const refreshTokenData = tokensService.generateRefreshToken(userDto);

  await SessionRepository.createSession({
    userId: user.id,
    refreshToken: refreshTokenData.token,
    expiresAt: refreshTokenData.expiresAt,
    ip: ipAddress,
    userAgent,
    origin,
  });

  return {
    accessToken: accessTokenData.token,
    refreshToken: refreshTokenData.token,
    user: userDto,
  };
};

export default signinByEmail;
