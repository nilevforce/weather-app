// @ts-check

import UserRepository from '../../repositories/user.repository.js';
import { NotFoundError } from '../../errors/api/index.js';

import { UserDto } from '../../dtos/users/index.js';

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array<UserDto>>} Array of user objects.
 */
const getAllUsers = async () => {
  const users = await UserRepository.findAllUsers();
  if (!users) {
    throw new NotFoundError({
      message: 'Users not found',
    });
  }
  const userDtos = users.map((user) => new UserDto(user));
  return userDtos;
};

export default getAllUsers;
