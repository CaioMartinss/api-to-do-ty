import { Router } from 'express';
import deleteTodoController from '../../controllers/delete_todo_controller';
import authenticateMiddleware from '../../middlewares/auth_middleware'; // Middleware de autenticação

const deleteTodoRouter = Router();

deleteTodoRouter.delete(
  '/delete_todos/:id',
  authenticateMiddleware,
  deleteTodoController
); // Adiciona o middleware 'authenticate'

export default deleteTodoRouter;
