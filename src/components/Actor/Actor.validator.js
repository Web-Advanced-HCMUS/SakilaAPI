import { param, body } from 'express-validator';
import validatorErrorHandler from '../../utils/validatorErrorHandle.js';

export const getFullNameValidator = [
  body('firstName').isAlpha().withMessage('First name must be Alphabetic!'),
  body('lastName').isAlpha().withMessage('Last name must be Alphabetic!'),
  validatorErrorHandler
];

export const getActorIdValidator = [
  param('id').isNumeric().withMessage('ID must be number!'),
  validatorErrorHandler
];
