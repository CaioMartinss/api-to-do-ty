import { Request, Response } from 'express';
import deleteTodoService from '../services/delete_todo_service';

export const deleteTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const userId = (req as any).user?.userId; // Verifica se o userId existe

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const result = await deleteTodoService(todoId, userId);

    if (result === 'not found') {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (result === 'not authorized') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this todo' });
    }

    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default deleteTodo;
