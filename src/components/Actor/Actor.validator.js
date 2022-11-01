import { param, body } from 'express-validator';
import { validatorErrorHandler } from '../../utils/validatorErrorHandle.js';

export const getFullNameValidator = [
  body('firstName').isAlpha().notEmpty().withMessage('Wrong name format!'),
  body('lastName').isAlpha().notEmpty().withMessage('Wrong name format!'),
  validatorErrorHandler()
];

export const getActorIdValidator = [
  param('id').isNumeric().withMessage('ID must be number!'),
  validatorErrorHandler()
];
