import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateUser = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must have at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must have at least 6 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateUser;
