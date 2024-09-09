import prisma from '../config/prisma'; // Cliente Prisma

const updateTodoService = async (
  todoId: string,
  title: string,
  description: string,
  userId: string
): Promise<string> => {
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!todo) {
    return 'not found'; // Retorna 'not found' se o Todo não for encontrado
  }

  if (todo.userId !== userId) {
    return 'not authorized'; // Retorna 'not authorized' se o usuário não for o proprietário do Todo
  }

  await prisma.todo.update({
    where: { id: todoId },
    data: {
      title,
      description,
    },
  });

  return 'updated'; // Retorna 'updated' quando o Todo for atualizado com sucesso
};

export default updateTodoService;
