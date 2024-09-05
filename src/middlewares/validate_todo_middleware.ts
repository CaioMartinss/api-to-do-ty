import { body } from 'express-validator';

const validateTodo = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long')
    .isLength({ max: 20 })
    .withMessage('Title must be at most 20 characters long'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long')
    .isLength({ max: 50 })
    .withMessage('Description must be at most 50 characters long'),
];


export default validateTodo;