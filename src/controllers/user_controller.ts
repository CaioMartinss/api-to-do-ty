import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validateUser from '../middlewares/validate_user';  // Certifique-se de que o caminho está correto

const userController = Router();
const prisma = new PrismaClient();

// Função para criar um token JWT
function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}

// Rota de registro de usuário
userController.post('/register', validateUser, async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Verifique se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crie um novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Gere um token JWT
    const token = generateToken(newUser.id);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default userController;
