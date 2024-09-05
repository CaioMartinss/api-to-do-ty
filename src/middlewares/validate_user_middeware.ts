import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

const validateUser = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must have at least 3 characters')
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({ where: { name: value } });
      if (existingUser) {
        return Promise.reject('Name already in use');
      }
      return true;
    }),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email')
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({ where: { email: value } });
      if (existingUser) {
        return Promise.reject('Email already in use');
      }
      return true;
    }),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'i').withMessage(
      'Password must have at least 6 characters, one uppercase letter, one lowercase letter, and one number'
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateUser;
