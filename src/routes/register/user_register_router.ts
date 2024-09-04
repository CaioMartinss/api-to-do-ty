import { Router } from 'express';
import userController from '../../controllers/register_user_controller';
import validateUser from '../../middlewares/validate_user_middeware';

const userRegisterRouter = Router();

userRegisterRouter.post('/register', validateUser, userController.register);

export default userRegisterRouter;
