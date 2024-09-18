"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Authorization token missing or invalid' });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = { userId: decoded.userId };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.default = authenticateMiddleware;
