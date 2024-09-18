import { Request, Response } from 'express';
import createUserService from '../services/register_user_service';

const userRegisterController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Validação dos dados
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await createUserService({
        name,
        email,
        password,
      });

      res
        .status(201)
        .json({ token: user.token, message: 'User registered successfully!' });
    } catch (error: any) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default userRegisterController;
