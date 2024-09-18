import { Router } from 'express';
import createTodoController from '../../controllers/create_todo_controller';
import validateTodoMiddleware from '../../middlewares/validate_todo_middleware';
import authenticateMiddleware from '../../middlewares/auth_middleware';

const createTodoRouter = Router();

createTodoRouter.post(
  '/create_todos',
  authenticateMiddleware,
  validateTodoMiddleware,
  createTodoController
);

export default createTodoRouter;
