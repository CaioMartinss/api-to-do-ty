import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateTodoData {
  title: string;
  description: string;
  userId: string;
}

const createTodo = async ({ title, description, userId }: CreateTodoData) => {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
  return todo;
};

export default createTodo;
