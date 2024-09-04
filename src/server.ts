import express from 'express';
import bodyParser from 'body-parser';
import userRegisterRouter from './routes/register/user_register_router';
import userLoginRouter from './routes/login/user_login_router';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parser JSON
app.use(bodyParser.json());

// Use as rotas de usuário
app.use('/', userRegisterRouter);
app.use('/', userLoginRouter);

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
