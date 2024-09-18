import { Request, Response } from 'express';
import updateTodoService from '../services/update_todo_service';
import { validationResult } from 'express-validator';

export const updateTodoController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const todoId = req.params.id;
  const { title, description } = req.body;
  const userId = (req as any).user.userId; // Pega o userId do token JWT

  try {
    const result = await updateTodoService(todoId, title, description, userId);

    if (result === 'not found') {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (result === 'not authorized') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to update this todo' });
    }

    return res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default updateTodoController;
