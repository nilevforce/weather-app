import usersServices from '../../services/users/index.js';
import { ForbiddenError } from '../../errors/api/index.js';

const getUserById = async (req, res) => {
  const { id: requestedId } = req.params;
  const { id: currentUserId } = req.user;

  if (currentUserId !== requestedId) {
    throw new ForbiddenError();
  }

  const user = await usersServices.getUserById(requestedId);
  res.json(user);
};

export default getUserById;
