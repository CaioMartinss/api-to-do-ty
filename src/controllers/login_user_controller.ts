import { Request, Response } from 'express';
import loginUser from '../services/login_user_service';
import { validationResult } from 'express-validator';

export const loginUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    if (token) {
      return res.status(200).json({ token, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default loginUserController;
