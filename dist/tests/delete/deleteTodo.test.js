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
describe('DELETE /delete_todos', () => {
    let token;
    let todoId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Autenticar e obter token válido
        const res = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            email: 'yjf2lhb@example.com', // Substitua por um usuário válido do seu sistema
            password: 'Qu89tlh',
        });
        token = `Bearer ${res.body.token}`;
        // Criar um TODO de teste para deletar posteriormente
        const createRes = yield (0, supertest_1.default)(server_1.app)
            .post('/create_todos')
            .set('Authorization', token)
            .send({
            title: 'carregar a máquina',
            description: 'Comprar frutas e verduras',
        });
        todoId = createRes.body.todo.id; // Armazenar o ID do TODO criado
    }));
    it('should delete a TODO successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app)
            .delete(`/delete_todos/${todoId}`)
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Todo deleted successfully');
    }));
    it('should return an error if the user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).delete(`/delete_todos/${todoId}`);
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Authorization token missing or invalid');
    }));
    it('should return an error if the user is not authorized', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app)
            .delete(`/delete_todos/${todoId}`)
            .set('Authorization', 'Bearer invalidToken');
        expect(res.statusCode).toEqual(401); // Espera que retorne 401 Unauthorized
        expect(res.body).toHaveProperty('message', 'Invalid or expired token');
    }));
});
