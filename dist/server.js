"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const user_register_router_1 = __importDefault(require("./routes/register/user_register_router"));
const user_login_router_1 = __importDefault(require("./routes/login/user_login_router"));
const create_todo_router_1 = __importDefault(require("./routes/create/create_todo_router"));
const list_todo_router_1 = __importDefault(require("./routes/list/list_todo_router"));
const delete_todo_router_1 = __importDefault(require("./routes/delete/delete_todo_router"));
const update_todo_router_1 = __importDefault(require("./routes/update/update_todo_router"));
const delete_user_router_1 = __importDefault(require("./routes/delete/delete_user_router"));
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
// Middleware para parser JSON
app.use(body_parser_1.default.json());
// Carregar o arquivo de documentação Swagger
const swaggerDocument = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, './swagger.json'), 'utf8'));
// Servir a documentação Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Use as rotas de usuário
app.use('/', user_register_router_1.default);
app.use('/', user_login_router_1.default);
app.use('/', create_todo_router_1.default);
app.use('/', list_todo_router_1.default);
app.use('/', delete_todo_router_1.default);
app.use('/', update_todo_router_1.default);
app.use('/', delete_user_router_1.default);
// Inicializa o servidor
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
