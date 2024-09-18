"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateLoginMiddleware = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
exports.default = validateLoginMiddleware;
