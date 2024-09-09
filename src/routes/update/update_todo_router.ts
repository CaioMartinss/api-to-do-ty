import updateTodo from '../../controllers/update_todo_controller';
import updateAuthenticate from '../../middlewares/auth_update_middleware';

import { Router } from 'express';

const updateTodoRouter = Router();

updateTodoRouter.put('/todos/:id', updateAuthenticate, updateTodo);

export default updateTodoRouter;
