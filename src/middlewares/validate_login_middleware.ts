import { body } from 'express-validator';

const validateLoginMiddleware = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password').notEmpty().withMessage('Password is required'),
];

export default validateLoginMiddleware;
