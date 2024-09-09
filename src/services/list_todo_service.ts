import prisma from '../config/prisma';


const listTodosService = async () => {
  return await prisma.todo.findMany();
};

export default listTodosService;
