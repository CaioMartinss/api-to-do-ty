"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(userId) {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    return jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn: '1h' });
}
exports.default = generateToken;
