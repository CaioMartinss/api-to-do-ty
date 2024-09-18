"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_todo_controller_1 = __importDefault(require("../../controllers/create_todo_controller"));
const validate_todo_middleware_1 = __importDefault(require("../../middlewares/validate_todo_middleware"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth_middleware"));
const createTodoRouter = (0, express_1.Router)();
createTodoRouter.post('/create_todos', auth_middleware_1.default, validate_todo_middleware_1.default, create_todo_controller_1.default);
exports.default = createTodoRouter;
