import UserRepository from '../../repositories/user.repository.js';

const getAllUsers = async () => {
  const users = await UserRepository.findAllUsers();
  return users;
};

export default getAllUsers;
