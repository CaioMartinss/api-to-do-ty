import { Router } from 'express';
import deleteUserController from '../../controllers/delete_user_controller';
import authenticateMiddleware from '../../middlewares/auth_middleware'; // Middleware de autenticação

const deleteUserRouter = Router();

deleteUserRouter.delete(
  '/user_delete',
  authenticateMiddleware,
  deleteUserController
);

export default deleteUserRouter;
