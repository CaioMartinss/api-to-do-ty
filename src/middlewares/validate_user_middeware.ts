import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validateUser = [
  // Validação para o campo 'name'
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must have at least 3 characters'),
  body('name').custom(async (value) => {
    const existingUser = await prisma.user.findUnique({
      where: { name: value },
    });
    if (existingUser) {
      return Promise.reject('Name already in use');
    }
    return true; // Adiciona retorno para finalizar a promise
  }),

  // Validação para o campo 'email'
  body('email')
    .notEmpty()
    .withMessage('Email is required') // Verifica se o campo não está vazio
    .isEmail()
    .withMessage('Invalid email'), // Verifica se o formato do email é válido
  body('email').custom(async (value) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: value },
    });
    if (existingUser) {
      return Promise.reject('Email already in use');
    }
    return true; // Adiciona retorno para finalizar a promise
  }),

  // Validação para o campo 'password'
  body('password')
    .notEmpty()
    .withMessage('Password is required') // Verifica se o campo não está vazio
    .isLength({ min: 6 })
    .withMessage('Password must have at least 6 characters') // Verifica o comprimento mínimo
    .custom((value) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
      if (!regex.test(value)) {
        return Promise.reject(
          'Password must have at least 6 characters, one uppercase letter, one lowercase letter, and one number'
        );
      }
      return true; // Adiciona retorno para finalizar a promise
    }),

  // Middleware para capturar e retornar os erros de validação
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateUser;
