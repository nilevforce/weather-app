import bcrypt from 'bcrypt';
import UserRepository from '../../repositories/user.repository.js';

/**
 * Registers a new user if the email is not already taken.
 *
 * @param {Object} params - Signup parameters.
 * @param {string} params.email - User email address.
 * @param {string} params.password - User password (plain text).
 * @returns {Promise<void>}
 */
const signupByEmail = async ({ email, password }) => {
  const existingUser = await UserRepository.findUserByEmail(email);
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserRepository.createUser({
      email,
      password: hashedPassword,
    });
  }
};

export default signupByEmail;
