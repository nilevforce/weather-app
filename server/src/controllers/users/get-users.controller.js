import usersServices from '../../services/users/index.js';

const getUsers = async (req, res) => {
  const users = await usersServices.getAllUsers();

  res.status(200).json(users);
};

export default getUsers;
