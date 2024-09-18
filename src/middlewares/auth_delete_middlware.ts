import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateDeleteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extrai o token do cabeçalho

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as any;

    (req as any).user = { userId: decoded.userId }; // Atribui o userId ao req
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authenticateDeleteMiddleware;
