import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import generateToken from '../config/jwt'

interface UserData {
  name: string;
  email: string;
  password: string;
}

export async function createUser({ name, email, password }: UserData) {
  try {
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
  } catch (error) {
    console.error('Error creating user:', (error as Error).message);
    throw new Error('Error creating user');
  }
}

// Função para criar um token JWT
generateToken;

export default createUser;
