import { Router } from 'express';
import registerUserController from '../../controllers/register_user_controller';
import validateUserMiddleware from '../../middlewares/validate_user_middleware';

const userRegisterRouter = Router();

// Rota de registro
userRegisterRouter.post(
  '/register',
  validateUserMiddleware,
  registerUserController.register
);

export default userRegisterRouter;
