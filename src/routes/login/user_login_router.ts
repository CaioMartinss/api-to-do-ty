import { Router } from 'express';
import loginUserController from '../../controllers/login_user_controller';
import validateLoginMiddleware from '../../middlewares/validate_login_middleware';

const loginUserRouter = Router();

loginUserRouter.post('/login', validateLoginMiddleware, loginUserController);

export default loginUserRouter;
