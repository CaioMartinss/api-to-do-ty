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
const register_user_service_1 = __importDefault(require("../services/register_user_service"));
const userRegisterController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                // Validação dos dados
                if (!name || !email || !password) {
                    return res.status(400).json({ message: 'All fields are required' });
                }
                const user = yield (0, register_user_service_1.default)({
                    name,
                    email,
                    password,
                });
                res
                    .status(201)
                    .json({ token: user.token, message: 'User registered successfully!' });
            }
            catch (error) {
                console.error('Error registering user:', error.message);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    },
};
exports.default = userRegisterController;
