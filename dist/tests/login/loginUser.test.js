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
const server_1 = require("../../server"); // Ajuste o caminho se necessário
describe('POST /login', () => {
    it('Deve fazer login com sucesso e retornar um token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            email: 'yjf2lhb@example.com',
            password: 'Qu89tlh',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('message', 'Login successful');
    }));
    it('Deve retornar erro ao tentar fazer login com email inexistente', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            email: 'porra@example.com',
            password: 'Password123',
        });
        expect(response.status).toBe(401); // Ajustando para 401, que é o código esperado
        expect(response.body).toHaveProperty('message', 'Invalid email or password');
    }));
    it('Deve retornar erro ao tentar fazer login com senha incorreta', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            email: 'john@example.com',
            password: 'WrongPassword',
        });
        expect(response.status).toBe(401); // Ajustando para 401, que é o código esperado
        expect(response.body).toHaveProperty('message', 'Invalid email or password');
    }));
    it('Deve retornar erro ao tentar fazer login sem senha', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            email: 'john@example.com',
        });
        expect(response.status).toBe(400); // Valide o código de erro para campos faltantes
        expect(response.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ msg: 'Password is required' }),
        ]));
    }));
    it('Deve retornar erro ao tentar fazer login sem email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            password: 'Password123',
        });
        expect(response.status).toBe(400); // Valide o código de erro para campos faltantes
        expect(response.body.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ msg: 'Email is required' }),
        ]));
    }));
});
