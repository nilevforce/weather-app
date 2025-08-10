import { ForbiddenError } from '../errors/api/index.js';

/**
 * Middleware for verifying user roles
 * @param {string[]} roles - Array of allowed roles
 * @returns {function} Middleware function
 */
const checkRole = (roles) => (req, res, next) => {
  if (!req.user) throw new ForbiddenError();

  const userRole = req.user.role;

  if (roles.includes(userRole)) {
    next();
  } else {
    throw new ForbiddenError();
  }
};

export default checkRole;
