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
const server_1 = require("../../server"); // Ajuste o caminho conforme necessário
describe('PUT /update_todos/:id', () => {
    let token;
    let todoId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Autenticar e obter token válido
        const res = yield (0, supertest_1.default)(server_1.app).post('/login').send({
            email: 'yjf2lhb@example.com', // Substitua por um usuário válido do seu sistema
            password: 'Qu89tlh',
        });
        token = `Bearer ${res.body.token}`; // Corrigido: Adicionado espaço entre "Bearer" e o token
        // Criar um TODO de teste para atualizar posteriormente
        const createRes = yield (0, supertest_1.default)(server_1.app)
            .post('/create_todos')
            .set('Authorization', token)
            .send({
            title: 'Lavar o carro',
            description: 'Lavar o carro no sábado',
        });
        console.log('Resposta de criação:', createRes.body); // Log para debug
        todoId = (_a = createRes.body.todo) === null || _a === void 0 ? void 0 : _a.id; // Corrigido: uso seguro de "?" para prevenir erro se o todo não existir
        // Certificar que o todoId foi definido
        if (!todoId) {
            throw new Error('Erro ao criar TODO. Não foi possível obter todoId.');
        }
    }));
    it('should update a TODO successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(server_1.app)
            .put(`/update_todos/${todoId}`)
            .set('Authorization', token)
            .send({
            title: 'Lavar o carro atualizado',
            description: 'Lavar o carro no domingo',
        });
        console.log('Resposta de atualização:', updateRes.body);
        expect(updateRes.statusCode).toEqual(200);
        expect(updateRes.body).toHaveProperty('message', 'Todo updated successfully'); // Verifica apenas a mensagem
    }));
    it('should return an error if the TODO does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = '64b5a2bcf94b010012345678'; // Um ObjectID válido mas não existente
        const updateRes = yield (0, supertest_1.default)(server_1.app)
            .put(`/update_todos/${nonExistentId}`) // Corrigido: Crase para interpolação de strings
            .set('Authorization', token)
            .send({
            title: 'Novo título',
            description: 'Nova descrição',
        });
        console.log('Resposta para TODO inexistente:', updateRes.body); // Log para debug
        expect(updateRes.statusCode).toEqual(404);
        expect(updateRes.body).toHaveProperty('message', 'Todo not found');
    }));
    it('should return an error if the user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(server_1.app).put(`/update_todos/${todoId}`).send({
            title: 'Novo título',
            description: 'Nova descrição',
        });
        console.log('Resposta para usuário não autenticado:', updateRes.body); // Log para debug
        expect(updateRes.statusCode).toEqual(401);
        expect(updateRes.body).toHaveProperty('message', 'Authorization token missing or invalid');
    }));
    it('should return an error if the user is not authorized', () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(server_1.app)
            .put(`/update_todos/${todoId}`) // Corrigido: Crase para interpolação de strings
            .set('Authorization', 'Bearer invalidToken')
            .send({
            title: 'Novo título',
            description: 'Nova descrição',
        });
        console.log('Resposta para token inválido:', updateRes.body); // Log para debug
        expect(updateRes.statusCode).toEqual(401);
        expect(updateRes.body).toHaveProperty('message', 'Invalid or expired token');
    }));
});
