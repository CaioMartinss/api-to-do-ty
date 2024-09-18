import listTodosController from '../../controllers/list_todo_controller';
import { Router } from 'express';

const listTodosRouter = Router();

listTodosRouter.get('/todos', listTodosController);

export default listTodosRouter;
