import { Router } from 'express';
import prisma from '../../config/prisma';  // Certifique-se de que o caminho esteja correto

const testRouter = Router();

testRouter.get('/connection', async (req, res) => {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    res.status(200).json({ message: 'Connected to the database successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to the database', error });
  } finally {
    await prisma.$disconnect();
  }
});

export default testRouter;
