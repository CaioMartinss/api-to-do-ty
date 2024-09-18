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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const prisma_1 = __importDefault(require("../config/prisma"));
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
// Middleware para parser JSON
app.use(body_parser_1.default.json());
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${port}`);
    // Testar a conexão com o banco de dados
    try {
        yield prisma_1.default.$connect();
        console.log('Connected to the database successfully');
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
}));
