import jwt from 'jsonwebtoken';

/**
 * JWT utility class for signing and verifying JSON Web Tokens.
 */
class JWT {
  /**
   * Signs a payload and returns a JWT.
   * @param {Object} payload - The data to encode in the token.
   * @param {string} secret - The secret key to sign the token.
   * @param {Object} options - Options for signing the token.
   * @param {string|number} options.expiresIn - Expiration time (e.g., '1h', 3600).
   * @returns {string} The signed JWT.
   */
  static sign(payload, secret, options) {
    const { expiresIn } = options;
    return jwt.sign(payload, secret, { expiresIn });
  }

  /**
   * Verifies a JWT and returns the decoded payload.
   * @param {string} token - The JWT to verify.
   * @param {string} secret - The secret key to verify the token.
   * @returns {Object} The decoded payload.
   * @throws {Error} If the token is invalid or expired.
   */
  static verify(token, secret) {
    return jwt.verify(token, secret);
  }
}

export default JWT;
