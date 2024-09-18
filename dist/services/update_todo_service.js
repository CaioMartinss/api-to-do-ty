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
const prisma_1 = __importDefault(require("../config/prisma")); // Cliente Prisma
const updateTodoService = (todoId, title, description, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield prisma_1.default.todo.findUnique({
        where: { id: todoId },
    });
    if (!todo) {
        return 'not found'; // Retorna 'not found' se o Todo não for encontrado
    }
    if (todo.userId !== userId) {
        return 'not authorized'; // Retorna 'not authorized' se o usuário não for o proprietário do Todo
    }
    yield prisma_1.default.todo.update({
        where: { id: todoId },
        data: {
            title,
            description,
        },
    });
    return 'updated'; // Retorna 'updated' quando o Todo for atualizado com sucesso
});
exports.default = updateTodoService;
