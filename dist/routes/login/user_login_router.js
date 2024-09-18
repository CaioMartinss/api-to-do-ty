"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_user_controller_1 = __importDefault(require("../../controllers/login_user_controller"));
const validate_login_middleware_1 = __importDefault(require("../../middlewares/validate_login_middleware"));
const loginUserRouter = (0, express_1.Router)();
loginUserRouter.post('/login', validate_login_middleware_1.default, login_user_controller_1.default);
exports.default = loginUserRouter;
