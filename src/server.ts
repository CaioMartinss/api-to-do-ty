import express from 'express';
import bodyParser from 'body-parser';
import userRegisterRouter from './routes/register/user_register_router';
import userLoginRouter from './routes/login/user_login_router';
import createTodo from './routes/create/create_todo_router';
import listTodos from './routes/read/list_todo_router';
import deleteTodo from './routes/delete/delete_todo_router';
import updateTodo from './routes/update/update_todo_router';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parser JSON
app.use(bodyParser.json());

// Use as rotas de usuário
app.use('/', userRegisterRouter);
app.use('/', userLoginRouter);
app.use('/', createTodo);
app.use('/', listTodos);
app.use('/', deleteTodo);
app.use('/', updateTodo);

// Inicializa o servidor

//dizer ola
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
