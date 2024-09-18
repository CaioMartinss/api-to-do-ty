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
const server_1 = require("../../server"); // O arquivo principal do seu Express
describe('POST /create_todos', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Gerar um token válido dinamicamente
        const res = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            email: 'yjf2lhb@example.com', // Substitua por um usuário válido do seu sistema
            password: 'Qu89tlh',
        });
        // Corrigindo a interpolação do token
        token = `Bearer ${res.body.token}`;
        console.log('Token:', token);
    }));
    it('Deve criar um novo TODO com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app)
            .post('/create_todos')
            .set('Authorization', token) // Definindo o token de autorização
            .send({
            title: 'Fazer compras',
            description: 'Comprar frutas e verduras',
        });
        expect(res.statusCode).toEqual(201); // Espera que a resposta seja 201 Created
        expect(res.body.todo).toHaveProperty('id'); // Espera que o TODO tenha um ID
        expect(res.body.todo).toHaveProperty('title', 'Fazer compras');
        expect(res.body.todo).toHaveProperty('description', 'Comprar frutas e verduras');
        // Apenas para depuração, pode ser removido
        console.log('response:', res.body);
    }));
    it('Deve retornar erro ao tentar criar sem autenticação', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post('/create_todos').send({
            title: 'Fazer compras',
            description: 'Comprar frutas e verduras',
        });
        expect(res.statusCode).toEqual(401); // Espera que a resposta seja 401 Unauthorized
        expect(res.body).toHaveProperty('message', 'Authorization token missing or invalid');
    }));
});
