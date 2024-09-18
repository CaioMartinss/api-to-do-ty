"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_todo_controller_1 = __importDefault(require("../../controllers/delete_todo_controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth_middleware")); // Middleware de autenticação
const deleteTodoRouter = (0, express_1.Router)();
deleteTodoRouter.delete('/delete_todos/:id', auth_middleware_1.default, delete_todo_controller_1.default); // Adiciona o middleware 'authenticate'
exports.default = deleteTodoRouter;
