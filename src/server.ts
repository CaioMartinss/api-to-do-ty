import express from 'express';
import bodyParser from 'body-parser';
import userController from './controllers/user_controller';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parser JSON
app.use(bodyParser.json());

// Use as rotas de usuário
app.use('/', userController);

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
