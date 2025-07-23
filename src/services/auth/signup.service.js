import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma.js';
import ApiError from '../../errors/ApiError.js';
import UserDto from '../../dtos/user.dto.js';

const signup = async ({
  email,
  password,
}) => {
  const candidate = await prisma.user.findUnique({
    where: { email },
  });

  if (candidate) {
    throw ApiError.ConflictError(`User with ${email} email address already exists`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
    },
  });

  return { user: new UserDto(user) };
};

export default signup;
