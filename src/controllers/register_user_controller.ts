import { Request, Response } from 'express';
import { createUser } from '../services/register_user_service';
import validateUser from '../middlewares/validate_user_middeware';

const userController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await createUser({ name, email, password });
      res
        .status(201)
        .json({ token: user.token, message: 'User registered successfully!' });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: error.message || 'Internal server error' });
    }
  },
};

export default userController;
