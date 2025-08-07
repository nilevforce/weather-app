// @ts-check

/**
 * @typedef {Object} UserDtoData
 * @property {string} id - Users ID.
 * @property {string} email - Users email.
 */

class UserDto {
  /**
   * @param {UserDtoData} user - User data.
   */
  constructor(user) {
    this.email = user.email;
    this.id = user.id;
  }
}

export default UserDto;
