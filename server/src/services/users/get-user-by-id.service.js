// @ts-check

import UserRepository from '../../repositories/user.repository.js';
import { NotFoundError } from '../../errors/api/index.js';
import { UserDto } from '../../dtos/users/index.js';

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<UserDto>} Array of user objects.
 */
const getUserById = async (id) => {
  const user = await UserRepository.findUserById(id);
  if (!user) {
    throw new NotFoundError({
      message: 'User not found',
    });
  }
  const userDto = new UserDto(user);
  return userDto;
};

export default getUserById;
