"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_user_controller_1 = __importDefault(require("../../controllers/delete_user_controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth_middleware")); // Middleware de autenticação
const deleteUserRouter = (0, express_1.Router)();
deleteUserRouter.delete('/user_delete', auth_middleware_1.default, delete_user_controller_1.default);
exports.default = deleteUserRouter;
