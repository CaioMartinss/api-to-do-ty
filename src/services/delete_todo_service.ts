import prisma from '../config/prisma';

const deleteTodoService = async (
  todoId: string,
  userId: string
): Promise<string> => {
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!todo) {
    return 'not found';
  }

  if (todo.userId !== userId) {
    return 'not authorized';
  }

  await prisma.todo.delete({
    where: { id: todoId },
  });

  return 'deleted';
};

export default deleteTodoService;
