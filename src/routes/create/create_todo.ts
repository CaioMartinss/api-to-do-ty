import { Router } from 'express';
import create from '../../controllers/create_todo_controller';
import validateTodo from '../../middlewares/validate_todo_middleware';
import authenticate from '../../middlewares/auth_middleware';

const todoRouter = Router();

todoRouter.post('/todos', authenticate, validateTodo, create);

export default todoRouter;
