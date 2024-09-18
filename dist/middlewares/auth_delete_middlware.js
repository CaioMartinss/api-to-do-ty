"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateDeleteMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateDeleteMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extrai o token do cabeçalho
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = { userId: decoded.userId }; // Atribui o userId ao req
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
exports.authenticateDeleteMiddleware = authenticateDeleteMiddleware;
exports.default = exports.authenticateDeleteMiddleware;
