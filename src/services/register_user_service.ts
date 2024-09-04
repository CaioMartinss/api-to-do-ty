import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface UserData {
  name: string;
  email: string;
  password: string;
}

export async function createUser({ name, email, password }: UserData) {
  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o novo usuário no banco de dados
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Gera o token JWT
  const token = generateToken(newUser.id);

  return { ...newUser, token };
}

// Função para criar um token JWT
function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}
