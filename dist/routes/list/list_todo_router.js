"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_todo_controller_1 = __importDefault(require("../../controllers/list_todo_controller"));
const express_1 = require("express");
const listTodosRouter = (0, express_1.Router)();
listTodosRouter.get('/todos', list_todo_controller_1.default);
exports.default = listTodosRouter;
