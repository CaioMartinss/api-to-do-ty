import { Request, Response } from 'express';
import createTodo from '../services/create_todo_service';
import { validationResult } from 'express-validator';

export const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const userId = (req as any).user.userId; // Pega o userId do token JWT

  try {
    const todo = await createTodo({ title, description, userId });
    return res.status(201).json({ todo, message: 'Todo created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default create;
