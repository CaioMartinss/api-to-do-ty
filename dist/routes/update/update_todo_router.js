"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_todo_controller_1 = __importDefault(require("../../controllers/update_todo_controller"));
const auth_update_middleware_1 = __importDefault(require("../../middlewares/auth_update_middleware"));
const express_1 = require("express");
const updateTodoRouter = (0, express_1.Router)();
updateTodoRouter.put('/update_todos/:id', auth_update_middleware_1.default, update_todo_controller_1.default);
exports.default = updateTodoRouter;
