// src/testConnection.ts

import prisma from '../config/prisma';  // Certifique-se de que o caminho esteja correto

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully');

    // Teste simples para verificar se a conexão está funcionando
    const users = await prisma.user.findMany();
    console.log('Retrieved users:', users);

  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
