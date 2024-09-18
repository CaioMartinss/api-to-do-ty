import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

import userRegisterRouter from './routes/register/user_register_router';
import userLoginRouter from './routes/login/user_login_router';
import createTodo from './routes/create/create_todo_router';
import listTodos from './routes/list/list_todo_router';
import deleteTodo from './routes/delete/delete_todo_router';
import updateTodo from './routes/update/update_todo_router';
import deleteUserRouter from './routes/delete/delete_user_router';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parser JSON
app.use(bodyParser.json());

// Carregar o arquivo de documentação Swagger
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './swagger.json'), 'utf8')
);

// Servir a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use as rotas de usuário
app.use('/', userRegisterRouter);
app.use('/', userLoginRouter);
app.use('/', createTodo);
app.use('/', listTodos);
app.use('/', deleteTodo);
app.use('/', updateTodo);
app.use('/', deleteUserRouter);

// Inicializa o servidor
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export { app };
