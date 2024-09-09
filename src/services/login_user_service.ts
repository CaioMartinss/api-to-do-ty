import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    return token;
  }

  return null;
};

export default loginUser;
