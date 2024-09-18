import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'your-secret-key';

  try {
    const decoded = jwt.verify(token, secret) as { userId: string };
    (req as any).user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateMiddleware;
