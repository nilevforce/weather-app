import prisma from '../../lib/prisma.js';

const save = async ({
  userId,
  refreshToken,
  userAgent,
  fingerprint,
  ip,
  expiresAt,
}) => {
  const token = await prisma.token.create({
    data: {
      userId,
      refreshToken,
      userAgent,
      fingerprint,
      ip,
      expiresAt,
    },
  });

  return token;
};

export default save;
