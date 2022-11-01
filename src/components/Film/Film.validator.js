import { param, body } from 'express-validator';
import validatorErrorHandler from '../../utils/validatorErrorHandle.js';

import { FILM_RATING, FILM_SPECIAL_FEATURES } from '../../utils/constant.js';

export const getFilmIdValidator = [
  param('id').isNumeric().withMessage('Id Must be Number!'),
  validatorErrorHandler
];

export const getFilmNameValidator = [
  param('name').isString().notEmpty().withMessage('Film name must be String!'),
  validatorErrorHandler
];

export const getFilmBodyValidator = [
  body('title').isString().notEmpty().withMessage('Film title must be String!'),
  body('description').isString().optional({ nullable: true })
  .withMessage('Film description must be String!'),
  body('releaseYear').isNumeric().optional({ nullable: true })
  .withMessage('Film release year must be number!'),
  body('languageId').isNumeric().withMessage('Film language Id must be number!'),
  body('originalLanguageId').isNumeric().optional({ nullable: true })
  .withMessage('Film original language Id must be number!'),
  body('rentalDuration').isNumeric().withMessage('Film rental duration must be number!'),
  body('length').isNumeric().optional({ nullable: true })
  .withMessage('Film length must be number!'),
  body('replacementCost').isNumeric().withMessage('Film replacement cost must be number!'),
  body('rating').optional({ nullable: true }).isIn(Object.keys(FILM_RATING))
  .withMessage('Film rating must be in (G, PG, PG-13, R, NC-17)!'),
  body('specialFeatures').optional({ nullable: true }).isIn(FILM_SPECIAL_FEATURES)
  .withMessage('Film special features must be in (Trailers, Commentaries, Deleted Scenes, Behind the Scenes)!'),
  validatorErrorHandler
];
