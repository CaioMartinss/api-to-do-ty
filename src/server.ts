import express from 'express';
import bodyParser from 'body-parser';
import userRegisterRouter from './routes/register/user_register_router';
import userLoginRouter from './routes/login/user_login_router';
import createTodo from './routes/create/create_todo';

import prisma from './config/prisma'; // Certifique-se de que o caminho para o prisma esteja correto

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parser JSON
app.use(bodyParser.json());

// Use as rotas de usuário
app.use('/', userRegisterRouter);
app.use('/', userLoginRouter);
app.use('/', createTodo);

// Inicializa o servidor
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  // Testar a conexão com o banco de dados
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
});

//dizer ola
app.get('/', (req, res) => {
  res.send('Hello World!');
});
