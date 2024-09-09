import express from 'express';
import bodyParser from 'body-parser';
import prisma from '../config/prisma';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parser JSON
app.use(bodyParser.json());

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


export { app };
