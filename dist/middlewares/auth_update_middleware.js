"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Biblioteca JWT para lidar com tokens
const updateAuthenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Obtém o token do header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Authorization token missing or invalid' }); // Retorna erro se o token estiver ausente ou inválido
    }
    const token = authHeader.split(' ')[1]; // Extrai o token do header
    const secret = process.env.JWT_SECRET || 'your-secret-key'; // Segredo JWT (pode vir do .env)
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret); // Verifica e decodifica o token
        req.user = { userId: decoded.userId }; // Armazena o userId decodificado na requisição
        next(); // Passa para o próximo middleware
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' }); // Erro se o token for inválido ou expirado
    }
};
exports.default = updateAuthenticateMiddleware;
