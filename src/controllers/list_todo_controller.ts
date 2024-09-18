import { Request, Response } from 'express';
import listTodosService from '../services/list_todo_service';

export const listTodoController = async (req: Request, res: Response) => {
  try {
    const todos = await listTodosService();
    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default listTodoController;
