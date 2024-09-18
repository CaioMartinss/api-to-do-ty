"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_user_controller_1 = __importDefault(require("../../controllers/register_user_controller"));
const validate_user_middleware_1 = __importDefault(require("../../middlewares/validate_user_middleware"));
const userRegisterRouter = (0, express_1.Router)();
// Rota de registro
userRegisterRouter.post('/register', validate_user_middleware_1.default, register_user_controller_1.default.register);
exports.default = userRegisterRouter;
