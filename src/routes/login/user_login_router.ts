import { Router } from 'express';
import  login  from '../../controllers/login_user_controller';
import validateLogin from '../../middlewares/validate_login_middleware';

const loginRouter = Router();

loginRouter.post('/login', validateLogin, login);

export default loginRouter;
