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
exports.deleteTodoController = void 0;
const delete_todo_service_1 = __importDefault(require("../services/delete_todo_service"));
const deleteTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const todoId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Verifica se o userId existe
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const result = yield (0, delete_todo_service_1.default)(todoId, userId);
        if (result === 'not found') {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (result === 'not authorized') {
            return res
                .status(403)
                .json({ message: 'You are not authorized to delete this todo' });
        }
        return res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteTodoController = deleteTodoController;
exports.default = exports.deleteTodoController;
