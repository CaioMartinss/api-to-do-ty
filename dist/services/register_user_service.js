"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserService = registerUserService;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerUserService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
        try {
            // Verifica se o usuário já existe
            const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            // Hash da senha
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Cria o novo usuário no banco de dados
            const newUser = yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            // Gera o token JWT
            const token = generateToken(newUser.id);
            return Object.assign(Object.assign({}, newUser), { token });
        }
        catch (error) {
            console.error('Error creating user:', error.message);
            throw new Error('Error creating user');
        }
    });
}
// Função para criar um token JWT
function generateToken(userId) {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    return jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn: '1h' });
}
exports.default = registerUserService;
