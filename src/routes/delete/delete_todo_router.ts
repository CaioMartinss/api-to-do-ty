import { Router } from 'express';
import deleteTodo from '../../controllers/delete_todo_controller';
import authenticate from '../../middlewares/auth_middleware'; // Middleware de autenticação

const deleteTodoRouter = Router();

deleteTodoRouter.delete('/delete_todos/:id', authenticate, deleteTodo); // Adiciona o middleware 'authenticate'

export default deleteTodoRouter;
