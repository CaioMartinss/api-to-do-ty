import prisma from '../config/prisma';

const deleteUserService = async (userId: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return 'not found';
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return 'deleted';
};

export default deleteUserService;
