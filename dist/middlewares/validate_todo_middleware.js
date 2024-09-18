"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateTodoMiddleware = [
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long')
        .isLength({ max: 20 })
        .withMessage('Title must be at most 20 characters long'),
    (0, express_validator_1.body)('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long')
        .isLength({ max: 50 })
        .withMessage('Description must be at most 50 characters long'),
];
exports.default = validateTodoMiddleware;
