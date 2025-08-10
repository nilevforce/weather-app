// @ts-check

/**
 * @typedef {Object} UserDtoData
 * @property {string} id - User ID.
 * @property {string} email - User email.
 * @property {string} role - User role.
 */

class UserDto {
  /**
   * @param {UserDtoData} user - User data.
   */
  constructor(user) {
    this.email = user.email;
    this.id = user.id;
    this.role = user.role;
  }
}

export default UserDto;
