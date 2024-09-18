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
exports.updateTodoController = void 0;
const update_todo_service_1 = __importDefault(require("../services/update_todo_service"));
const express_validator_1 = require("express-validator");
const updateTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const todoId = req.params.id;
    const { title, description } = req.body;
    const userId = req.user.userId; // Pega o userId do token JWT
    try {
        const result = yield (0, update_todo_service_1.default)(todoId, title, description, userId);
        if (result === 'not found') {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (result === 'not authorized') {
            return res
                .status(403)
                .json({ message: 'You are not authorized to update this todo' });
        }
        return res.status(200).json({ message: 'Todo updated successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateTodoController = updateTodoController;
exports.default = exports.updateTodoController;
