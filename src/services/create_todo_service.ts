import prisma from '../config/prisma';


interface CreateTodoData {
  title: string;
  description: string;
  userId: string;
}

const createTodoService = async ({ title, description, userId }: CreateTodoData) => {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
  return todo;
};

export default createTodoService;
