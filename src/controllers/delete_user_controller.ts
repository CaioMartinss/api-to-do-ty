import { Request, Response } from 'express';
import deleteUserService from '../services/delete_user_service';

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId; // Obtém o userId do token

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const result = await deleteUserService(userId);

    if (result === 'not found') {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default deleteUserController;
