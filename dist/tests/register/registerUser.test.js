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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
// Função para gerar senha que atenda ao padrão
function generateValidPassword() {
    const upperCase = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Letra maiúscula
    const lowerCase = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Letra minúscula
    const number = String.fromCharCode(48 + Math.floor(Math.random() * 10)); // Número
    const randomChars = Math.random().toString(36).substring(2, 6); // Caracteres aleatórios
    return `${upperCase}${lowerCase}${number}${randomChars}`;
}
describe('POST /register', () => {
    it('should register a new user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        // Gerando valores aleatórios para evitar duplicações
        const aleatoryName = Math.random().toString(36).substring(7);
        const aleatoryEmail = `${Math.random()
            .toString(36)
            .substring(7)}@example.com`;
        const aleatoryPassword = generateValidPassword();
        const newUser = {
            name: aleatoryName,
            email: aleatoryEmail,
            password: aleatoryPassword,
        };
        const response = yield (0, supertest_1.default)(server_1.app).post('/register').send(newUser);
        // Exibir a resposta para ajudar na depuração, se necessário.
        console.log('Response body:', response.body);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('message', 'User registered successfully!');
        // Exibir o usuário registrado para ajudar na depuração, se necessário.
        console.log('USER:', newUser);
    }));
    it('should return an error if the username is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            email: 'john@example.com',
            password: 'StrongPassword123',
        };
        const response = yield (0, supertest_1.default)(server_1.app).post('/register').send(newUser);
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ msg: 'Name is required' }),
        ]));
    }));
    it('should return an error if the password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: 'JohnDoe',
            email: 'john@example.com',
        };
        const response = yield (0, supertest_1.default)(server_1.app).post('/register').send(newUser);
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ msg: 'Password is required' }),
        ]));
    }));
    it('should return an error if the email is already in use', () => __awaiter(void 0, void 0, void 0, function* () {
        // Primeiro, registre um usuário
        yield (0, supertest_1.default)(server_1.app).post('/register').send({
            name: 'JaneDoe',
            email: 'jane@example.com',
            password: 'AnotherPassword123',
        });
        // Agora tente registrar outro usuário com o mesmo email
        const response = yield (0, supertest_1.default)(server_1.app).post('/register').send({
            name: 'JohnDoe',
            email: 'jane@example.com',
            password: 'NewPassword123',
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ msg: 'Email already in use' }),
        ]));
    }));
});
