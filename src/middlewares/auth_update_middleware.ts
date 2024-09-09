import { Request, Response, NextFunction } from 'express'; // Tipos do Express
import jwt from 'jsonwebtoken'; // Biblioteca JWT para lidar com tokens

const updateAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization; // Obtém o token do header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization token missing or invalid' }); // Retorna erro se o token estiver ausente ou inválido
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do header
  const secret = process.env.JWT_SECRET || 'your-secret-key'; // Segredo JWT (pode vir do .env)

  try {
    const decoded = jwt.verify(token, secret) as { userId: string }; // Verifica e decodifica o token
    (req as any).user = { userId: decoded.userId }; // Armazena o userId decodificado na requisição
    next(); // Passa para o próximo middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' }); // Erro se o token for inválido ou expirado
  }
};

export default updateAuthenticate;
