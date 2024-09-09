import listTodos from '../../controllers/list_todo_controller';
import { Router } from 'express';

const listTodosRouter = Router();

listTodosRouter.get('/todos', listTodos);

export default listTodosRouter;
