import prisma from '../lib/prisma.js';

class UserRepository {
  /**
   * Creates a new user.
   *
   * @param {Object} params - User parameters.
   * @param {string} params.email - User email address.
   * @param {string} params.password - User password (hashed).
   * @returns {Promise<Object>} Created user object.
   */
  static async createUser({ email, password }) {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return user;
  }

  /**
   * Retrieves all users from the database.
   *
   * @returns {Promise<Array<Object>>} Array of user objects.
   */
  static async findAllUsers() {
    const users = await prisma.user.findMany();

    return users;
  }

  /**
   * Finds a user by their unique identifier.
   *
   * @param {string} id - User identifier.
   * @returns {Promise<Object|null>} User object if found, otherwise null.
   */
  static async findUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - User email address.
   * @returns {Promise<Object|null>} User object if found, otherwise null.
   */
  static async findUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}

export default UserRepository;
